import { FC } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { BsFacebook as FacebookIcon } from 'react-icons/bs';

const providers = [
  {
    name: 'Google',
    icon: <GoogleIcon size={25} />,
    style: { color: '#000', backgroundColor: '#fff', border: '1px solid gray' },
    handleSignIn: () => signIn('google')
  },
  {
    name: 'Facebook',
    icon: <FacebookIcon size={25} />,
    style: { backgroundColor: '#1877F2' },
    handleSignIn: () => signIn('facebook')
  }
];

const LoginProviders: FC = () => {
  return (
    <>
      {providers.map(({ name, icon, style, handleSignIn }, id) => (
        <button
          key={id}
          type="button"
          style={style}
          onClick={handleSignIn}
          className="flex items-center justify-center gap-3 w-full text-white p-3 rounded-3xl font-semibold"
        >
          {icon} Continue with {name}
        </button>
      ))}
    </>
  );
};

const CredentialInputs: FC = () => {
  return (
    <>
      <input
        type="email"
        placeholder="Email"
        className="credential-input"
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="credential-input"
        pattern=".{6,}"
        title="Password must be at least 6 characters"
        required
      />
    </>
  );
};

const LoginForm = () => {
  return (
    <form onSubmit={undefined} className="flex flex-col gap-4">
      <LoginProviders />
      <div className="relative z-10">
        <span className="absolute inset-0 m-auto vertical-line-gradient h-px z-0"></span>
        <span className="relative bg-white px-4">OR</span>
      </div>
      <CredentialInputs />
      <button
        type="submit"
        className="block w-full bg-dark hover:bg-cyan-500 font-bold p-3 text-white transition-colors rounded-3xl"
      >
        Login
      </button>
      <div className="text-neutral-500 my-2">
        New to scatch?{' '}
        <Link href="/register" className="text-dark underline">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
