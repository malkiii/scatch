import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '@/components/Forms/LoginForm';

const LoginPage: NextPage = () => {
  return (
    <div className="flex h-screen flex-col items-center from-base-300 to-transparent dark:bg-gradient-to-b">
      <Head>
        <title>Login to Scatch</title>
      </Head>
      <header className="w-full px-7">
        <nav className="mx-auto flex h-[65px] max-w-7xl items-center justify-between">
          <Link href="/">
            <Image src="/logotype.svg" alt="scatch logo" width={144} height={39} className="logo" />
          </Link>
          <div className="z-10">
            <span className="hidden text-base-content/50 sm:inline">New to scatch?</span>
            <Link href="/register" className="theme-btn ml-4">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
      <div className="-mt-20 flex w-full flex-1 items-center px-7">
        <div className="mx-auto w-[540px] text-center">
          <h2 className="my-10 text-4xl sm:text-5xl">welcome to scatch</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
