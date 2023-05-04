import { FC } from 'react';
import Link from 'next/link';
import Providers from './Providers';
import Head from 'next/head';

const CredentialInputs: FC = () => {
  return (
    <>
      <input
        type="email"
        name="user[email]"
        placeholder="Email"
        className="credential-input"
        required
      />
      <input
        type="password"
        name="user[password]"
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
    <form
      onSubmit={undefined}
      className="flex flex-col gap-4"
      autoComplete="on"
    >
      <Head>
        <title>Login to Scatch</title>
      </Head>
      <Providers message="Continue with" />
      <div className="relative z-10">
        <span className="absolute inset-0 m-auto vertical-line-gradient h-px z-0"></span>
        <span className="relative bg-white px-4">OR</span>
      </div>
      <CredentialInputs />
      <button type="submit" className="submit-btn">
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
