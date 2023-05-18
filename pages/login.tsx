import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import LoginForm from '@/components/Forms/LoginForm';
import Image from 'next/image';

const LoginPage: NextPage = () => {
  return (
    <div className="h-screen flex flex-col items-center">
      <Head>
        <title>Login to Scatch</title>
      </Head>
      <header className="w-full">
        <nav className="flex items-center justify-between max-w-7xl px-7 py-5 mx-auto">
          <Link href="/">
            <Image src="/logotype.svg" alt="scatch logo" width={144} height={39} className="logo" />
          </Link>
          <div className="z-10">
            <span className="hidden sm:inline text-neutral-500">New to scatch?</span>
            <Link href="/register" className="theme-btn py-[11px] ml-4">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
      <div className="flex items-center flex-1 px-7 w-full -mt-20">
        <div className="w-[540px] mx-auto text-center">
          <h2 className="auth-title my-10">welcome to scatch</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
