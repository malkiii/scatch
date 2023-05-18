import signUp from '@/utils/signUp';
import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from '@/hooks/useForm';
import { SignUpFormData, WithFormError } from '@/types';
import { AuthProviders, ErrorMessage, SubmitButton, VerticalLine } from './FormItems';

type CredentialInputsProps = {
  data: SignUpFormData & WithFormError;
  handleInput: (e: any) => void;
};
const CredentialInputs: FC<CredentialInputsProps> = ({ data, handleInput }) => {
  const { firstName, lastName, email, password, error } = data;
  return (
    <>
      <div className="flex align-center gap-x-4">
        <input
          id="firstName"
          type="text"
          name="user[first_name]"
          placeholder="First name"
          className="inline-block credential-input"
          value={firstName}
          onInput={handleInput}
          required
        />
        <input
          id="lastName"
          type="text"
          name="user[last_name]"
          placeholder="Last name"
          className="inline-block credential-input"
          value={lastName}
          onInput={handleInput}
        />
      </div>
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
        {error === 'Email' && <ErrorMessage>This email is already exists!</ErrorMessage>}
      </div>
      <div>
        <input
          id="password"
          type="password"
          name="user[password]"
          placeholder="Password (min. 6 characters)"
          className={`credential-input ${error == 'Password' ? 'error' : ''}`}
          title="Password must be at least 6 characters"
          value={password}
          onInput={handleInput}
          required
        />
        {error == 'Password' && <ErrorMessage>Password minimum 6 characters!</ErrorMessage>}
      </div>
    </>
  );
};

const SignUpForm: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<SignUpFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    form.setError(undefined);

    // validate the password
    if (form.data.password.length < 6) {
      form.setError('Password');
      setIsSubmitting(false);
      return;
    }

    const { user, error } = await signUp(form.data);
    if (!user) {
      if (error == 'email') form.setError('Email');
      setIsSubmitting(false);
      return;
    }

    // Login with the new account
    const { email, password } = form.data;
    signIn('credentials', { email, password, callbackUrl: '/' });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4" autoComplete="on">
      <AuthProviders text="Join using" />
      <VerticalLine text="or join with your email" />
      <CredentialInputs {...form} />
      <SubmitButton {...{ text: 'Sign Up', isSubmitting }} />
    </form>
  );
};
export default SignUpForm;
