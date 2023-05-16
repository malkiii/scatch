import { FC, useState } from 'react';
import signUp from '@/utils/signUp';
import { AuthProviders, SubmitButton, VerticalLine } from './FormItems';
import { useForm } from '@/hooks/useForm';
import { SignUpFormData } from '@/types';
import { signIn } from 'next-auth/react';

type CredentialInputsProps = {
  data: SignUpFormProps;
  handleInput: (e: any) => void;
};
const CredentialInputs: FC<CredentialInputsProps> = ({ data, handleInput }) => {
  return (
    <>
      <div className="flex align-center gap-x-4">
        <input
          id="firstName"
          type="text"
          name="user[first_name]"
          placeholder="First name"
          className="inline-block credential-input"
          value={data.firstName}
          onInput={handleInput}
          required
        />
        <input
          id="lastName"
          type="text"
          name="user[last_name]"
          placeholder="Last name"
          className="inline-block credential-input"
          value={data.lastName}
          onInput={handleInput}
        />
      </div>
      <input
        id="email"
        type="email"
        name="user[email]"
        placeholder="Email"
        className="credential-input"
        value={data.email}
        onInput={handleInput}
        required
      />
      <input
        id="password"
        type="password"
        name="user[password]"
        placeholder="Password (min. 6 characters)"
        className="credential-input"
        title="Password must be at least 6 characters"
        value={data.password}
        onInput={handleInput}
        required
      />
    </>
  );
};

type SignUpFormProps = SignUpFormData & {
  error?: 'email' | 'password';
};

const SignUpForm: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<SignUpFormProps>({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    // validate the password
    if (form.data.password.length < 6) {
      form.setData(prevData => ({ ...prevData, error: 'password' }));
      setIsSubmitting(false);
      return;
    }

    const { user, error } = await signUp(form.data);
    if (!user) {
      if (error === 'email') form.setData(prevData => ({ ...prevData, error: 'email' }));
      setIsSubmitting(false);
      return;
    }

    const { email, password } = form.data;
    await signIn('credentials', { email, password, callbackUrl: '/' });

    // e.currentTarget.submit();
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
