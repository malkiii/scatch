import Head from 'next/head';
import { NextPage } from 'next';
import SignUpForm from '@/components/Forms/SignUpForm';

const RegisterPage: NextPage = () => {
  return (
    <div
      className="text-dark bg-white w-full h-screen overflow-hidden"
      style={{ colorScheme: 'light' }}
    >
      <Head>
        <title>Join to Scatch</title>
      </Head>
      <div className="h-full flex items-center p-7">
        <SignUpForm />
      </div>
    </div>
  );
};
export default RegisterPage;
