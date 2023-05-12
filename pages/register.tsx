import Head from 'next/head';
import { NextPage } from 'next';
import Link from 'next/link';
import SignUpForm from '@/components/Forms/SignUpForm';
import { ScatchMark } from '@/components/Forms/FormItems';

const RegisterPage: NextPage = () => {
  return (
    <div className="w-full h-screen flex items-center overflow-hidden p-7">
      <Head>
        <title>Join to Scatch</title>
      </Head>
      <div className="text-center w-[540px] mx-auto">
        <ScatchMark className="mx-auto animate-spin-slow" />
        <div className="my-9">
          <h2 className="auth-title">join to scatch</h2>
          <div className="text-neutral-500">
            Already have an account?{' '}
            <Link href="/login" className="underline dark:text-white text-dark">
              Login
            </Link>
          </div>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};
export default RegisterPage;
