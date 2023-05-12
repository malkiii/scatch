import Image from 'next/image';
import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import { siteInfos } from '@/data/constants';
import { SpinnerAnimation } from '../Loading';
import { renderToString } from 'react-dom/server';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { BsFacebook as FacebookIcon } from 'react-icons/bs';

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
const signInOptions = { callbackUrl: siteInfos.url };
const providers = [
  {
    name: 'Google',
    icon: <GoogleIcon size={iconSize} />,
    className:
      'text-dark bg-white border border-neutral-400 dark:border-none hover:bg-neutral-50',
    handleSignIn: () => signIn('google', signInOptions)
  },
  {
    name: 'Facebook',
    icon: <FacebookIcon size={iconSize} />,
    className: 'text-white bg-[#1877F2] hover:bg-[#166ee1]',
    handleSignIn: () => signIn('facebook', signInOptions)
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
            'flex items-center justify-center gap-3 w-full text-center p-3 rounded-3xl font-semibold transition-colors ' +
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
  onClick?: () => void;
};
export const SubmitButton: FC<SubmitButtonProps> = ({ text, onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="block theme-btn text-center"
    >
      {text}
    </button>
  );
};

type VerticalLineProps = {
  text?: string;
};
export const VerticalLine: FC<VerticalLineProps> = ({ text }) => {
  return (
    <div className="relative z-10">
      <span className="absolute inset-0 m-auto vertical-line-gradient dark:invert h-px z-0"></span>
      <span className="relative bg-white dark:bg-dark px-3">{text}</span>
    </div>
  );
};
