import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import LoginForm from '@/components/Forms/LoginForm';
import { ScatchMark } from '@/components/Forms/FormItems';

const LoginPage: NextPage = () => {
  return (
    <div className="h-screen flex items-center p-7">
      <Head>
        <title>Login to Scatch</title>
      </Head>
      <div className="w-[540px] mx-auto text-center">
        <ScatchMark className="mx-auto animate-spin-slow" />
        <h2 className="auth-title my-10">welcome to scatch</h2>
        <LoginForm />
        <div className="text-neutral-500 my-6">
          New to scatch?{' '}
          <Link
            href="/register"
            className="dark:text-white text-dark underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
