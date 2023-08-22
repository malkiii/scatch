import {
  ButtonHTMLAttributes,
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  PropsWithChildren,
  useRef,
  useState
} from 'react';
import type { User } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { BiHide as HideIcon, BiShow as ShowIcon } from 'react-icons/bi';
import { BsFacebook as FacebookIcon } from 'react-icons/bs';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { IoMdCamera as CameraIcon, IoIosWarning as WarningIcon } from 'react-icons/io';
import { cn, getUserAvatar, resizeAndCropImage } from '@/utils';
import { trpc } from '@/utils/trpc';
import { Modal } from '../Modal';

const providerIconSize = 25;
const providers = [
  {
    name: 'Google',
    icon: <GoogleIcon size={providerIconSize} />,
    className: 'text-dark bg-white border border-neutral-400 dark:border-none hover:bg-neutral-50',
    handleSignIn: () => signIn('google', { callbackUrl: '/' })
  },
  {
    name: 'Facebook',
    icon: <FacebookIcon size={providerIconSize} />,
    className: 'text-white bg-[#1877F2] hover:bg-[#166ee1]',
    handleSignIn: () => signIn('facebook', { callbackUrl: '/' })
  }
];

type AuthProvidersProps = {
  text: string;
};
export const AuthProviders: FC<AuthProvidersProps> = ({ text }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  function handleClick(target: HTMLButtonElement, handler: Function) {
    if (isLoading) return;
    setIsLoading(true);
    target.innerHTML = '<div class="loading loading-spinner w-[25px]"></div>';
    handler();
  }

  return (
    <>
      {providers.map(({ name, icon, className, handleSignIn }, id) => (
        <button
          key={id}
          type="button"
          onClick={e => handleClick(e.currentTarget, handleSignIn)}
          className={cn(
            'flex w-full items-center justify-center gap-3 rounded-lg p-3 text-center font-semibold transition-colors',
            className
          )}
        >
          {icon} {text} {name}
        </button>
      ))}
    </>
  );
};

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}
export const SubmitButton: FC<SubmitButtonProps> = props => {
  const { loading, className, onClick, children, ...buttonProps } = props;
  return (
    <button
      type="submit"
      onClick={e => (loading ? e.preventDefault() : onClick && onClick(e))}
      className={cn('theme-btn', className)}
      {...buttonProps}
    >
      {loading ? <div className="loading loading-spinner w-[24px]"></div> : children}
    </button>
  );
};

export const ErrorMessage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <p role="alert" className="mt-2 w-full text-center text-sm text-error md:text-base">
      <WarningIcon className="mb-[3px] mr-1 inline-flex" /> {children}
    </p>
  );
};

interface InputProps extends PropsWithChildren<InputHTMLAttributes<HTMLInputElement>> {
  register: () => UseFormRegisterReturn<string>;
  error?: string;
}
export const Input: FC<InputProps> = ({ children, className, register, error, ...props }) => {
  return (
    <div className="relative w-full">
      {children}
      <input {...register()} {...props} className={cn('theme-input', className, { error })} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

type PasswordInputProps = Omit<InputProps, 'type' | 'name'>;
export const PasswordInput: FC<PasswordInputProps> = ({ children, className, ...props }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const iconSize = 22;

  return (
    <Input {...props} type={showPassword ? 'text' : 'password'} className={cn('pr-12', className)}>
      {children}
      <button
        type="button"
        className="absolute bottom-3 right-4 flex items-center"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <ShowIcon size={iconSize} /> : <HideIcon size={iconSize} />}
      </button>
    </Input>
  );
};

type AvatarPickerProps = {
  user: User;
  className?: string;
};
export const AvatarPicker: FC<AvatarPickerProps> = ({ user, className }) => {
  const [image, setImage] = useState<string | null>(null);
  const [savedImage, setSavedImage] = useState<typeof image>(null);
  const cropperRef = useRef<ReactCropperElement>(null);

  const updateSession = useSession().update;
  const { mutateAsync: changeUserImage, isLoading } = trpc.changeUserImage.useMutation();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    files && files.length && setImage(await resizeAndCropImage(files[0], 420, 420));
  };

  const saveImage = async () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    const imageURL = cropper.getCroppedCanvas().toDataURL();
    const newUserData = await changeUserImage({ userId: user.id, image: imageURL });
    await updateSession({ user: newUserData });

    setSavedImage(imageURL);
    setImage(null);
  };

  return (
    <div className={className}>
      <div className="group relative overflow-hidden rounded-circle">
        <img
          src={savedImage || getUserAvatar(user.image, true)}
          width={300}
          height={300}
          className="select-none"
          alt={`${user.name} avatar`}
          referrerPolicy="no-referrer"
        />
        <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-primary/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
          <CameraIcon size={40} />
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="hidden"
            // you have to add the value property to use the file input multiple times
            value=""
          />
        </label>
      </div>
      {image && (
        <Modal className="relative p-7" close={() => setImage(null)}>
          <Cropper ref={cropperRef} src={image} aspectRatio={1} className="mx-auto max-w-[420px]" />
          <SubmitButton
            type="button"
            loading={isLoading}
            onClick={saveImage}
            className="mt-4 w-full"
          >
            Save
          </SubmitButton>
        </Modal>
      )}
    </div>
  );
};
