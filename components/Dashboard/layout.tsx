import { FC, ReactNode } from 'react';
import { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';
import { MdEdit as EditIcon } from 'react-icons/md';
import { resizeAvatar } from '@/utils';
import { DashboardPageProps, DashboardPageRoute } from '.';
import DashboardNav from './Navbar';

const EditProfileLink: FC = () => {
  return (
    <Link
      href="/settings"
      className="text-md group flex w-fit items-center gap-x-2 rounded-md border-2 border-dark/40 px-2 py-1 transition-colors hover:border-dark dark:border-white/40 dark:hover:border-white"
    >
      <EditIcon
        size={22}
        className="text-dark/40 transition-all group-hover:text-dark dark:text-white/40 dark:group-hover:text-white"
      />
      Edit profile
    </Link>
  );
};

type LayoutProps = DashboardPageProps &
  WithRouterProps & {
    currentPageRoute: DashboardPageRoute;
    userProfileRoute: string;
    children: ReactNode;
  };
const DashboardLayout: FC<LayoutProps> = props => {
  const { user, userProfileRoute, currentPageRoute, children } = props;
  const { name, email, image } = user;

  return (
    <>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-10 px-4 py-20 text-center md:flex-row">
        <div className="h-full w-full md:w-[37%]">
          <img
            src={resizeAvatar(image) || '/assets/avatar-placeholder.png'}
            className="ml-auto mr-auto aspect-square h-[150px] rounded-circle md:mr-0 md:h-[175px]"
            referrerPolicy="no-referrer"
            alt="avatar"
          />
        </div>
        <div className="flex w-full flex-grow flex-col py-5 md:w-[63%] md:text-left">
          <div className="flex flex-col-reverse items-center justify-center gap-5 md:flex-row md:justify-normal">
            <strong className="block text-4xl">{name}</strong>
            <EditProfileLink />
          </div>
          <span className="mt-2 block text-lg text-neutral-700">{email}</span>
          <p className="mt-4 text-lg">Find your favorite images, edit or download them for free.</p>
        </div>
      </div>
      <div className="min-h-[600px] w-full">
        <DashboardNav {...{ userProfileRoute, currentPageRoute }} />
        {children}
      </div>
    </>
  );
};
export default DashboardLayout;
