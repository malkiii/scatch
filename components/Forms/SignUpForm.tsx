import { FC } from 'react';
import { User } from '@prisma/client';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { RegisteredInputs } from '@/types';
import { authValidationPatterns } from '@/data/constants';
import { AuthProviders, Input, PasswordInput, SubmitButton } from './FormComponents';

type SignUpFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type SignUpResponse = { user?: User; error?: string };
export async function signUp(data: SignUpFormData): Promise<SignUpResponse> {
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

const SignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>();

  const submitHandler = handleSubmit(async data => {
    // trying to sign up
    const { user, error: errorMessage } = await signUp(data);
    if (!user) return setError('email', { message: errorMessage });

    // Login with the new account
    const { email, password } = data;
    signIn('credentials', { email, password, callbackUrl: '/' });
  });

  const inputs: RegisteredInputs<SignUpFormData> = {
    firstName: {
      register: () =>
        register('firstName', {
          required: 'Specify the first name',
          pattern: {
            value: authValidationPatterns.name,
            message: 'No spaces or special characters!'
          },
          minLength: {
            value: 3,
            message: 'First name is too short!'
          },
          maxLength: {
            value: 15,
            message: 'First name is too long!'
          }
        }),
      error: errors.firstName?.message
    },
    lastName: {
      register: () =>
        register('lastName', {
          pattern: {
            value: authValidationPatterns.name,
            message: 'No spaces and special characters!'
          },
          maxLength: {
            value: 15,
            message: 'Last name is too long!'
          }
        }),
      error: errors.lastName?.message
    },
    email: {
      register: () =>
        register('email', {
          required: 'Specify your email address',
          pattern: {
            value: authValidationPatterns.email,
            message: 'Invalid Email!'
          }
        }),
      error: errors.email?.message
    },
    password: {
      register: () =>
        register('password', {
          required: 'Add a password',
          pattern: {
            value: authValidationPatterns.password,
            message: 'Password must be at least 6 characters'
          }
        }),
      error: errors.password?.message
    }
  };

  console.log({ data: getValues() });

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-y-4" autoComplete="on">
      <AuthProviders text="Join using" />
      <div className="divider my-2">OR</div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input {...inputs.firstName} placeholder="First name" />
        <Input {...inputs.lastName} placeholder="Last name" />
      </div>
      <Input type="email" {...inputs.email} placeholder="Email" />
      <PasswordInput {...inputs.password} placeholder="Password (min. 6 characters)" />
      <SubmitButton loading={isSubmitting}>Sign Up</SubmitButton>
    </form>
  );
};

export default SignUpForm;
