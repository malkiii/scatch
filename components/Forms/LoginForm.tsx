import { FC, useState } from 'react';
import { AuthProviders, SubmitButton, VerticalLine } from './FormItems';
import { useForm } from '@/hooks/useForm';
import { LoginFormData } from '@/types';

type CredentialInputsProps = {
  data: LoginFormProps;
  handleInput: (e: any) => void;
};
const CredentialInputs: FC<CredentialInputsProps> = ({ data, handleInput }) => {
  return (
    <>
      <input
        id="email"
        type="email"
        value={data.email}
        onInput={handleInput}
        name="user[email]"
        placeholder="Email"
        className="credential-input"
        required
      />
      <input
        id="password"
        type="password"
        name="user[password]"
        value={data.password}
        onInput={handleInput}
        placeholder="Password"
        className="credential-input"
        pattern=".{6,}"
        title="Password must be at least 6 characters"
        required
      />
    </>
  );
};

type LoginFormProps = LoginFormData;

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<LoginFormProps>({ email: '', password: '' });

  return (
    <form onSubmit={() => setIsSubmitting(true)} className="flex flex-col gap-4">
      <AuthProviders text="Continue with" />
      <VerticalLine text="OR" />
      <CredentialInputs {...form} />
      <SubmitButton {...{ text: 'Login', isSubmitting }} />
    </form>
  );
};

export default LoginForm;
