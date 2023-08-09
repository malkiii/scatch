import { FC, useState } from 'react';
import { compare } from 'bcryptjs';
import type { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { RegisteredInputs } from '@/types';
import { cn } from '@/utils';
import { trpc } from '@/utils/trpc';
import { authValidationPatterns } from '@/data/constants';
import { Modal } from '../Modal';
import { Input, PasswordInput, SubmitButton } from './FormComponents';

type ChanagePasswordFormData = {
  currentPassword: string;
  newPassword: string;
};

type PasswordModalProps = {
  userId: string;
  toggleModal: () => void;
};
const PasswordModal: FC<PasswordModalProps> = ({ userId, toggleModal }) => {
  const { data: user, isLoading } = trpc.getUser.useQuery(userId);
  const { mutateAsync: changePassword } = trpc.changeUserPassword.useMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<ChanagePasswordFormData>();

  const userHasPassword = !!user?.password;

  const submitHandler = handleSubmit(async data => {
    if (userHasPassword) {
      const isValidCurrentPassword = await compare(data.currentPassword, user.password!);
      if (!isValidCurrentPassword) {
        return setError('currentPassword', { message: 'Incorrect password!' });
      }
    }

    const isSamePassword = await compare(data.newPassword, user!.password!);
    if (isSamePassword) {
      return setError('newPassword', { message: 'This password is your current password!' });
    }

    await changePassword({ userId, password: data.newPassword });

    toggleModal();
  });

  const inputs: RegisteredInputs<ChanagePasswordFormData> = {
    currentPassword: {
      register: () =>
        register('currentPassword', {
          disabled: !userHasPassword,
          required: 'Add your current password!'
        }),
      error: errors.currentPassword?.message
    },
    newPassword: {
      register: () =>
        register('newPassword', {
          required: 'Add a password',
          pattern: {
            value: authValidationPatterns.password,
            message: 'Password must be at least 6 characters'
          }
        }),
      error: errors.newPassword?.message
    }
  };

  return (
    <Modal close={toggleModal} className="bg-transparent p-7 shadow-none">
      {isLoading ? (
        <div className="loading loading-dots mx-auto block w-16"></div>
      ) : (
        <form
          onSubmit={submitHandler}
          className="m-auto flex w-[400px] flex-col gap-y-4 rounded-xl bg-white shadow-2xl animate-in fade-in dark:bg-neutral"
        >
          <div className={cn({ 'pointer-events-none opacity-40': !userHasPassword })}>
            <PasswordInput id="user-current-password" {...inputs.currentPassword}>
              <label htmlFor="user-current-password" className="mb-2 inline-block">
                Current password:
              </label>
            </PasswordInput>
          </div>
          <PasswordInput id="user-new-password" {...inputs.newPassword}>
            <label htmlFor="user-new-password" className="mb-2 inline-block">
              New password:
            </label>
          </PasswordInput>
          <SubmitButton loading={isSubmitting}>Change</SubmitButton>
        </form>
      )}
    </Modal>
  );
};

type SettingsFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

type SettingsFormProps = {
  user: User;
  toggleModal: () => void;
};
export const SettingsForm: FC<SettingsFormProps> = ({ user, toggleModal }) => {
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [firstName, lastName] = user.name.split(/(?<=^\S+)\s/);
  const email = user.email;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<SettingsFormData>({
    defaultValues: {
      firstName,
      lastName,
      email
    }
  });

  const userId = user.id;
  const updateSession = useSession().update;
  const { mutateAsync: changeUsername } = trpc.changeUserName.useMutation();
  const { mutateAsync: changeEmail } = trpc.changeUserEmail.useMutation();

  const submitHander = handleSubmit(async ({ firstName, lastName, email }) => {
    let newUserData = user;

    // change username
    const name = firstName + ' ' + lastName;
    if (user.name !== name.trim()) {
      newUserData = await changeUsername({ userId, name });
    }

    // change email
    if (user.email !== email) {
      try {
        newUserData = await changeEmail({ userId, email });
      } catch (error) {
        return setError('email', { message: 'This email is already exists!' });
      }
    }

    await updateSession({ user: newUserData });

    toggleModal();
  });

  const inputs: RegisteredInputs<SettingsFormData> = {
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
    }
  };

  return (
    <>
      <form onSubmit={submitHander} className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <Input id="user-first-name" {...inputs.firstName}>
            <label htmlFor="user-first-name" className="mb-2 inline-block">
              First name:
            </label>
          </Input>
          <Input id="user-last-name" {...inputs.lastName}>
            <label htmlFor="user-last-name" className="mb-2 inline-block">
              Last name:
            </label>
          </Input>
        </div>
        <Input id="user-email" {...inputs.email}>
          <label htmlFor="user-email" className="mb-2 inline-block">
            Email:
          </label>
        </Input>
        <button type="button" className="theme-btn" onClick={() => setShowPasswordModal(true)}>
          Change Password
        </button>
        <div className="flex gap-4">
          <SubmitButton loading={isSubmitting} className="flex-1">
            Save
          </SubmitButton>
          <button type="button" className="theme-btn flex-1" onClick={toggleModal}>
            Cancel
          </button>
        </div>
      </form>
      {showPasswordModal && (
        <PasswordModal userId={user.id} toggleModal={() => setShowPasswordModal(false)} />
      )}
    </>
  );
};
