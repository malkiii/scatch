import { FC } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { RegisteredInputs } from '@/types';
import { AuthProviders, Input, PasswordInput, SubmitButton } from './FormComponents';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>();

  const submitHandler = handleSubmit(async ({ email, password }) => {
    const response = await signIn('credentials', { email, password, redirect: false });
    if (response) {
      const { error: errorMessage } = response;
      if (!errorMessage) return (location.pathname = '/');
      setError('email', { message: errorMessage });
    }
  });

  const inputs: RegisteredInputs<LoginFormData> = {
    email: {
      register: () => register('email', { required: true }),
      error: errors.email?.message
    },
    password: {
      register: () => register('password', { required: true }),
      error: errors.password?.message
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4">
      <AuthProviders text="Continue with" />
      <div className="divider my-2">OR</div>
      <Input type="email" {...inputs.email} placeholder="Email" />
      <PasswordInput {...inputs.password} placeholder="Password" />
      <SubmitButton loading={isSubmitting}>Login</SubmitButton>
    </form>
  );
};

export default LoginForm;
