import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { SpinnerAnimation } from '../Loading';
import { renderToString } from 'react-dom/server';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { FC, ReactNode, useState } from 'react';
import { BsFacebook as FacebookIcon } from 'react-icons/bs';
import { IoIosWarning as WarningIcon } from 'react-icons/io';

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
      className={'logo ' + (className || '')}
    />
  );
};

const iconSize = 25;
const providers = [
  {
    name: 'Google',
    icon: <GoogleIcon size={iconSize} />,
    className: 'text-dark bg-white border border-neutral-400 dark:border-none hover:bg-neutral-50',
    handleSignIn: () => signIn('google')
  },
  {
    name: 'Facebook',
    icon: <FacebookIcon size={iconSize} />,
    className: 'text-white bg-[#1877F2] hover:bg-[#166ee1]',
    handleSignIn: () => signIn('facebook')
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
    target.innerHTML = renderToString(<SpinnerAnimation size={iconSize} />);
    handler();
  }

  return (
    <>
      {providers.map(({ name, icon, className, handleSignIn }, id) => (
        <button
          key={id}
          type="button"
          onClick={e => handleClick(e.currentTarget, handleSignIn)}
          className={
            'flex w-full items-center justify-center gap-3 rounded-3xl p-3 text-center font-semibold transition-colors ' +
            className
          }
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
  onClick?: (e?: any) => void;
};
export const SubmitButton: FC<SubmitButtonProps> = ({ text, isSubmitting, onClick }) => {
  function handleClick(e: any) {
    if (isSubmitting) e.preventDefault();
    else onClick ? onClick(e) : null;
  }
  return (
    <button
      type="submit"
      onClick={handleClick}
      className="theme-btn flex items-center justify-center text-center"
    >
      {isSubmitting ? <SpinnerAnimation size={24} /> : text}
    </button>
  );
};

type VerticalLineProps = {
  text?: string;
};
export const VerticalLine: FC<VerticalLineProps> = ({ text }) => {
  return (
    <div className="relative z-10">
      <span className="vertical-line-gradient absolute inset-0 z-0 m-auto h-px dark:invert"></span>
      <span className="relative bg-white px-3 dark:bg-dark">{text}</span>
    </div>
  );
};

export const ErrorMessage: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="mt-1 flex w-full items-center justify-center gap-x-2 text-sm font-semibold text-error md:text-base">
      <WarningIcon /> {children}
    </div>
  );
};
