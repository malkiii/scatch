import { FC } from 'react';
import { AuthProviders, VerticalLine } from './FormItems';

const CredentialInputs: FC = () => {
  return (
    <>
      <div className="flex align-center gap-x-4">
        <input
          type="text"
          name="user[first_name]"
          placeholder="First name"
          className="inline-block credential-input"
          title=""
          required
        />
        <input
          type="text"
          name="user[last_name]"
          placeholder="Last name"
          className="inline-block credential-input"
          title=""
          required
        />
      </div>
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

const SignUpForm: FC = () => {
  return (
    <form onSubmit={undefined} className="flex flex-col gap-y-4">
      <AuthProviders text="Join using" />
      <VerticalLine text="or join with your email" />
      <CredentialInputs />
      <button type="submit" className="block theme-btn text-center">
        Sign Up
      </button>
    </form>
  );
};
export default SignUpForm;
