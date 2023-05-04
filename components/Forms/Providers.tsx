import { signIn } from 'next-auth/react';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { BsFacebook as FacebookIcon } from 'react-icons/bs';
import { FC, useState } from 'react';

export const providers = [
  {
    name: 'Google',
    icon: <GoogleIcon size={25} />,
    className:
      'text-dark bg-white border border-neutral-400 hover:bg-neutral-50',
    handleSignIn: () => signIn('google')
  },
  {
    name: 'Facebook',
    icon: <FacebookIcon size={25} />,
    className: 'text-white bg-[#1877F2] hover:bg-[#166ee1]',
    handleSignIn: () => signIn('facebook')
  }
];

type AuthProvidersProps = {
  message: string;
};

const Providers: FC<AuthProvidersProps> = ({ message }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  function handleClick(target: HTMLButtonElement, handler: Function) {
    if (isLoading) return;
    setIsLoading(true);
    target.innerHTML = 'Loading...';
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
          {icon} {message} {name}
        </button>
      ))}
    </>
  );
};

export default Providers;
