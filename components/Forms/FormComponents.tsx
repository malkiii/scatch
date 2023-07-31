import { FC, InputHTMLAttributes, PropsWithChildren, useState } from 'react';
import { signIn } from 'next-auth/react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { BiHide as HideIcon, BiShow as ShowIcon } from 'react-icons/bi';
import { BsFacebook as FacebookIcon } from 'react-icons/bs';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { IoIosWarning as WarningIcon } from 'react-icons/io';
import { cn } from '@/utils';

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

type SubmitButtonProps = PropsWithChildren<{
  loading: boolean;
}>;
export const SubmitButton: FC<SubmitButtonProps> = ({ loading, children }) => {
  return (
    <button type="submit" onClick={e => loading && e.preventDefault()} className="theme-btn">
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
export const PasswordInput: FC<PasswordInputProps> = ({ className, ...props }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const iconSize = 22;

  return (
    <Input {...props} type={showPassword ? 'text' : 'password'} className={cn('pr-12', className)}>
      <button
        type="button"
        className="absolute right-4 top-3 flex items-center"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <ShowIcon size={iconSize} /> : <HideIcon size={iconSize} />}
      </button>
    </Input>
  );
};
