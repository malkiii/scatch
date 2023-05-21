import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import LoginForm from '@/components/Forms/LoginForm';
import Image from 'next/image';

const LoginPage: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center">
      <Head>
        <title>Login to Scatch</title>
      </Head>
      <header className="w-full">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-7 py-5">
          <Link href="/">
            <Image src="/logotype.svg" alt="scatch logo" width={144} height={39} className="logo" />
          </Link>
          <div className="z-10">
            <span className="hidden text-neutral-500 sm:inline">New to scatch?</span>
            <Link href="/register" className="theme-btn ml-4 py-[11px]">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
      <div className="-mt-20 flex w-full flex-1 items-center px-7">
        <div className="mx-auto w-[540px] text-center">
          <h2 className="auth-title my-10">welcome to scatch</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
