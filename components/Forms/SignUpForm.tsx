import { FC } from 'react';
import Link from 'next/link';
import { siteInfos } from '@/data/constants';
import AuthProviders from '@/components/Forms/Providers';

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
    <div className="flex flex-col gap-y-4 w-[540px] mx-auto">
      <div className="text-center mb-5">
        <h2 className="capitalize text-4xl lg:text-5xl">
          join to {siteInfos.name}
        </h2>
        <div>
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </div>
      <AuthProviders message="Join using" />
      <span className="text-center"></span>
      <div className="relative text-center z-10">
        <span className="absolute inset-0 m-auto vertical-line-gradient h-px z-0"></span>
        <span className="relative bg-white px-3">or join with your email</span>
      </div>
      <CredentialInputs />
      <button type="submit" className="submit-btn">
        Sign Up
      </button>
    </div>
  );
};
export default SignUpForm;
