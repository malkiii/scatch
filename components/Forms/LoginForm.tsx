import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from '@/hooks/useForm';
import { LoginFormData, WithFormError } from '@/types';
import { AuthProviders, SubmitButton, VerticalLine, ErrorMessage } from './FormItems';

type CredentialInputsProps = {
  data: LoginFormData & WithFormError;
  handleInput: (e: any) => void;
};
const CredentialInputs: FC<CredentialInputsProps> = ({ data, handleInput }) => {
  const { email, password, error } = data;
  return (
    <>
      <div>
        <input
          id="email"
          type="email"
          name="user[email]"
          placeholder="Email"
          className={`credential-input ${error == 'Email' ? 'error' : ''}`}
          value={email}
          onInput={handleInput}
          required
        />
        {error == 'Email' && <ErrorMessage>This user does not exists!</ErrorMessage>}
      </div>
      <div>
        <input
          id="password"
          type="password"
          name="user[password]"
          placeholder="Password"
          className={`credential-input ${error == 'Password' ? 'error' : ''}`}
          pattern=".{6,}"
          title="Password must be at least 6 characters"
          value={password}
          onInput={handleInput}
          required
        />
        {error == 'Password' && <ErrorMessage>Invalid password!</ErrorMessage>}
      </div>
    </>
  );
};

const LoginForm: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<LoginFormData>({ email: '', password: '' });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    form.setError(undefined);

    // Login with the new account
    const { email, password } = form.data;
    const response = await signIn('credentials', { email, password, redirect: false });
    if (response) {
      const { error } = response as WithFormError;
      if (error) {
        form.setError(error);
        setIsSubmitting(false);
      } else location.pathname = '/';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <AuthProviders text="Continue with" />
      <VerticalLine text="OR" />
      <CredentialInputs {...form} />
      <SubmitButton {...{ text: 'Login', isSubmitting }} />
    </form>
  );
};

export default LoginForm;
