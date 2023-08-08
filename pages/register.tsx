import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ScatchMark } from '@/components/Forms/FormComponents';
import SignUpForm from '@/components/Forms/SignUpForm';

const RegisterPage: NextPage = () => {
  return (
    <div className="flex h-screen w-full items-center overflow-hidden from-base-300 to-transparent p-7 dark:bg-gradient-to-b">
      <Head>
        <title>Join to Scatch</title>
      </Head>
      <div className="mx-auto w-[540px] text-center">
        <ScatchMark className="mx-auto" />
        <div className="my-7">
          <h2 className="my-4 text-3xl sm:text-4xl">join to scatch</h2>
          <div className="text-base-content/50">
            Already have an account?{' '}
            <Link href="/login" className="link text-base-content">
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
