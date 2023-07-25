import { FC, ReactNode, useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { BsFacebook as FacebookIcon } from 'react-icons/bs';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { IoIosWarning as WarningIcon } from 'react-icons/io';
import { cn } from '@/utils';

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

type SubmitButtonProps = {
  text: string;
  isSubmitting: boolean;
  onClick?: (e?: MouseEvent) => void;
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
