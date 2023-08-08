import { FC, useState } from 'react';
import { signIn } from 'next-auth/react';
<<<<<<< HEAD
import { useForm } from 'react-hook-form';
import { RegisteredInputs } from '@/types';
import { authValidationPatterns } from '@/data/constants';
import { AuthProviders, Input, PasswordInput, SubmitButton } from './FormComponents';

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
=======
import { BiHide as HideIcon, BiShow as ShowIcon } from 'react-icons/bi';
import { SignUpFormData, WithFormError } from '@/types';
import { cn } from '@/utils';
import { useForm } from '@/hooks/useForm';
import { AuthProviders, ErrorMessage, SubmitButton } from './FormComponents';
>>>>>>> 77d38cf91e189519a04e52d121e8d2145f751324

type CachedData = { user?: any; message: string; error?: string };
export async function signUp(data: SignUpFormData): Promise<CachedData> {
  const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;
  const endpointURL = new URL('/api/auth/signup', NEXT_PUBLIC_APP_URL);

  const { firstName, lastName, email, password } = data;
  const name = (firstName.trim() + ' ' + lastName.trim()).trim();

  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  return await response.json();
}

type CredentialInputsProps = {
  data: SignUpFormData & WithFormError;
  handleInput: (e: any) => void;
};
const CredentialInputs: FC<CredentialInputsProps> = ({ data, handleInput }) => {
  const { firstName, lastName, email, password, error } = data;
  const name = firstName.trim() + lastName.trim();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <div>
        <div className="align-center flex gap-x-4">
          <input
            id="firstName"
            type="text"
            name="user[first_name]"
            placeholder="First name"
            className={cn('theme-input', { 'error': error == 'Name' })}
            value={firstName}
            onInput={handleInput}
            required
          />
          <input
            id="lastName"
            type="text"
            name="user[last_name]"
            placeholder="Last name"
            className={cn('theme-input', { 'error': error == 'Name' })}
            value={lastName}
            onInput={handleInput}
          />
        </div>
        {error == 'Name' &&
          (name.length > 30 ? (
            <ErrorMessage>Username is too long!</ErrorMessage>
          ) : name.length < 3 ? (
            <ErrorMessage>Username is too short!</ErrorMessage>
          ) : /[^\w]/.test(name) ? (
            <ErrorMessage>No spaces and special characters!</ErrorMessage>
          ) : (
            <ErrorMessage>First name must be defined!</ErrorMessage>
          ))}
      </div>
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
        {error == 'Email' && <ErrorMessage>This email is already exists!</ErrorMessage>}
      </div>
      <div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="user[password]"
            placeholder="Password (min. 6 characters)"
            className={cn('theme-input pr-12', { 'error': error == 'Password' })}
            title="Password must be at least 6 characters"
            value={password}
            onInput={handleInput}
            required
          />
          <button
            type="button"
            className="absolute right-4 top-0 h-full"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword && <ShowIcon size={22} />}
            {!showPassword && <HideIcon size={22} />}
          </button>
        </div>
        {error == 'Password' && <ErrorMessage>Password minimum 6 characters!</ErrorMessage>}
      </div>
    </>
  );
};

const SignUpForm: FC = () => {
<<<<<<< HEAD
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>();

  const submitHandler = handleSubmit(async data => {
=======
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<SignUpFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  function validate(input: WithFormError['error'], text: string) {
    if (!input) return;
    const patterns = {
      Name: /^[a-z_A-Z]{3,15} [a-z_A-Z]{0,15}$/m,
      Email: /^[\w-\.]+@([\w-]+\.)+\w{2,7}$/,
      Password: /.{6,}/
    };
    const isValid = patterns[input].test(text);
    if (!isValid) form.setError(input);
    return isValid;
  }

  function inputHandler(e: any) {
    const { id, value } = e.target as Record<string, string>;
    form.handleInput(e);
    form.setError(undefined);

    const { firstName, lastName, email, password } = form.data;
    switch (id) {
      case 'email':
        if (validate('Name', firstName.trim() + ' ' + lastName.trim())) {
          validate('Email', value);
        }
        break;
      case 'password':
        if (
          validate('Name', firstName.trim() + ' ' + lastName.trim()) &&
          validate('Email', email)
        ) {
          validate('Password', value);
        }
        break;
      default:
        if (id == 'firstName') validate('Name', value.trim() + ' ' + lastName.trim());
        else validate('Name', firstName.trim() + ' ' + value.trim());
        break;
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(!form.data.error);
    if (form.data.error) return;

>>>>>>> 77d38cf91e189519a04e52d121e8d2145f751324
    // trying to sign up
    const { user, error } = await signUp(form.data);
    if (!user) {
      if (error == 'Email') form.setError('Email');
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
      <div className="divider my-2">OR</div>
      <CredentialInputs data={form.data} handleInput={inputHandler} />
      <SubmitButton {...{ text: 'Sign Up', isSubmitting }} />
    </form>
  );
};

export default SignUpForm;
