import { NextPage } from 'next';
import LoginForm from '@/components/Forms/LoginForm';

const LoginPage: NextPage = () => {
  return (
    <div className="h-screen flex items-center p-7">
      <div className="w-[540px] mx-auto text-center">
        <h2 className="auth-title mb-10">welcome to scatch</h2>
        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;
