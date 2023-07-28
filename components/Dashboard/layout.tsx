import { FC, ReactNode } from 'react';
import { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';
import { MdEdit as EditIcon } from 'react-icons/md';
import { resizeAvatar } from '@/utils';
import { DashboardPageProps, DashboardPageRoute } from '.';
import DashboardNav from './Navbar';

const EditProfileLink: FC = () => {
  return (
    <Link href="/settings" className="btn-primary btn-outline btn p-2 font-normal brightness-125">
      <EditIcon size={22} />
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
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-10 px-4 pb-10 pt-20 text-center md:flex-row md:pb-20">
        <div className="h-full w-full md:w-[37%]">
          <img
            src={resizeAvatar(image) || '/assets/avatar-placeholder.png'}
            className="ml-auto mr-auto aspect-square h-[130px] rounded-circle md:mr-0 md:h-[175px]"
            referrerPolicy="no-referrer"
            alt="avatar"
          />
        </div>
        <div className="flex w-full flex-grow flex-col py-5 md:w-[63%] md:text-left">
          <div className="flex flex-col-reverse items-center justify-center gap-5 md:flex-row md:justify-normal">
            <strong className="block text-3xl md:text-4xl">{name}</strong>
            <EditProfileLink />
          </div>
          <span className="mt-2 block text-base text-base-content/60 md:text-lg">{email}</span>
          <p className="mt-4 hidden text-lg md:block">
            Find your favorite images, edit or download them for free.
          </p>
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
