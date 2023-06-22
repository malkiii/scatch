import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ScatchMark } from '@/components/Forms/FormItems';
import SignUpForm from '@/components/Forms/SignUpForm';

const RegisterPage: NextPage = () => {
  return (
    <div className="flex h-screen w-full items-center overflow-hidden p-7">
      <Head>
        <title>Join to Scatch</title>
      </Head>
      <div className="mx-auto w-[540px] text-center">
        <ScatchMark className="mx-auto" />
        <div className="my-9">
          <h2 className="auth-title">join to scatch</h2>
          <div className="text-neutral-500">
            Already have an account?{' '}
            <Link href="/login" className="text-dark underline dark:text-white">
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
