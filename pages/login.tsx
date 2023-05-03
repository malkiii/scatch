import { NextPage } from 'next';
import LoginForm from '@/components/Forms/LoginForm';

const LoginPage: NextPage = () => {
  return (
    <div className="font-rubik flex items-center justify-center bg-mesh-grandient px-4">
      <div
        className="text-center text-dark p-4 w-[460px] bg-white shadow-2xl rounded-xl"
        style={{ colorScheme: 'light' }}
      >
        <h1 className="my-4 text-4xl capitalize">welcome to scatch</h1>
        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;
