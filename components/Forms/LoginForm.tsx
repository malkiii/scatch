import { FC } from 'react';
import { AuthProviders, SubmitButton, VerticalLine } from './FormItems';

const CredentialInputs: FC = () => {
  return (
    <>
      <input
        type="email"
        name="user[email]"
        placeholder="Email"
        className="credential-input"
        required
      />
      <input
        type="password"
        name="user[password]"
        placeholder="Password"
        className="credential-input"
        pattern=".{6,}"
        title="Password must be at least 6 characters"
        required
      />
    </>
  );
};

const LoginForm = () => {
  return (
    <form onSubmit={undefined} className="flex flex-col gap-4">
      <AuthProviders text="Continue with" />
      <VerticalLine text="OR" />
      <CredentialInputs />
      <SubmitButton text="Login" />
    </form>
  );
};

export default LoginForm;
