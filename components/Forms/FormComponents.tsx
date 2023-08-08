<<<<<<< HEAD
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
import { signIn } from 'next-auth/react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { BiHide as HideIcon, BiShow as ShowIcon } from 'react-icons/bi';
=======
import { FC, ReactNode, useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
>>>>>>> 77d38cf91e189519a04e52d121e8d2145f751324
import { BsFacebook as FacebookIcon } from 'react-icons/bs';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { IoMdCamera as CameraIcon, IoIosWarning as WarningIcon } from 'react-icons/io';
import { cn, getUserAvatar, resizeAndCropImage } from '@/utils';
import { trpc } from '@/utils/trpc';
import { Modal } from '../Modal';

type MarkProps = {
  className?: string;
};
export const ScatchMark: FC<MarkProps> = ({ className }) => {
  return (
    <Image
      src="/mark.svg"
      alt="scatch mark"
      width={65}
      height={65}
      className={cn('logo', className)}
    />
  );
};

const iconSize = 25;
const providers = [
  {
    name: 'Google',
    icon: <GoogleIcon size={iconSize} />,
    className: 'text-dark bg-white border border-neutral-400 dark:border-none hover:bg-neutral-50',
    handleSignIn: () => signIn('google', { callbackUrl: '/' })
  },
  {
    name: 'Facebook',
    icon: <FacebookIcon size={iconSize} />,
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

<<<<<<< HEAD
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
=======
type SubmitButtonProps = {
  text: string;
  isSubmitting: boolean;
  onClick?: (e?: MouseEvent) => void;
>>>>>>> 77d38cf91e189519a04e52d121e8d2145f751324
};
export const SubmitButton: FC<SubmitButtonProps> = ({ text, isSubmitting, onClick }) => {
  function handleClick(e: any) {
    if (isSubmitting) e.preventDefault();
    else onClick ? onClick(e) : null;
  }
  return (
    <button type="submit" onClick={handleClick} className="theme-btn">
      {isSubmitting ? <div className="loading loading-spinner w-[25px]"></div> : text}
    </button>
  );
};

export const ErrorMessage: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="mt-2 flex w-full items-center justify-center gap-x-2 text-sm text-error md:text-base">
      <WarningIcon /> {children}
    </div>
  );
};
<<<<<<< HEAD

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

  const { mutateAsync: changeUserImage, isLoading } = trpc.changeUserImage.useMutation();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    files && files.length && setImage(await resizeAndCropImage(files[0], 420, 420));
  };

  const saveImage = async () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    const imageURL = cropper.getCroppedCanvas().toDataURL();
    await changeUserImage({ userId: user.id, image: imageURL });

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
=======
>>>>>>> 77d38cf91e189519a04e52d121e8d2145f751324
