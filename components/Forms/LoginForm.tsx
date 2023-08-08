import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import { LoginFormData, WithFormError } from '@/types';
import { cn } from '@/utils';
import { useForm } from '@/hooks/useForm';
import { AuthProviders, ErrorMessage, SubmitButton } from './FormComponents';

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
          className={cn('theme-input', { 'error': error == 'Email' })}
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
          className={cn('theme-input', { 'error': error == 'Password' })}
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
      <div className="divider my-2">OR</div>
      <CredentialInputs {...form} />
      <SubmitButton {...{ text: 'Login', isSubmitting }} />
    </form>
  );
};

export default LoginForm;
