import { FC, ReactNode, useState } from 'react';
import Link from 'next/link';
import { User } from 'next-auth';
import { MdEdit as EditIcon } from 'react-icons/md';
import { useRouter } from 'next/router';
import dashboardPage from '@/pages/[username]';

function resizeAvatar(avatarSrc?: string | null) {
  if (!avatarSrc) return null;
  if (avatarSrc.includes('lh3.googleusercontent.com')) {
    return avatarSrc.replace(/g=s\d+(-c)?/g, 'g=s360');
  }
  return avatarSrc;
}

const EditProfileLink: FC<{ profileRoute: string }> = ({ profileRoute }) => {
  return (
    <Link
      href={profileRoute + '/settings'}
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

const dashboardNavPages = ['images', 'albums', 'favorite', 'stats'];

type LayoutProps = {
  user: User;
  children: ReactNode;
};
const DashboardLayout: FC<LayoutProps> = ({ user, children }) => {
  const { name, email, image } = user;

  const router = useRouter();
  const userProfileRoute = '/' + router.query.username;

  const [currentPage, setCurrentPage] = useState<string>(dashboardNavPages[0]);
  const [trailerBorderStyle, setTrailerBorderStyle] = useState({
    '--trailer-border-width': '100%',
    '--trailer-border-position': '0'
  });

  function handleClick(e: any, page: string) {
    e.preventDefault(); // just in the development mode

    const link = e.currentTarget;
    const newWidth = link.offsetWidth + 'px';
    const newPosition = link.offsetLeft - link.parentElement!.offsetLeft + 'px';

    setCurrentPage(page);
    setTrailerBorderStyle({
      '--trailer-border-width': newWidth,
      '--trailer-border-position': newPosition
    });
  }

  return (
    <>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-10 px-4 py-20 text-center md:flex-row">
        <div className="h-full w-full md:w-[37%]">
          <img
            src={resizeAvatar(image) || '/assets/avatar-placeholder.png'}
            className="ml-auto mr-auto aspect-square h-[150px] rounded-circle md:mr-0 md:h-[210px]"
            referrerPolicy="no-referrer"
            alt="avatar"
          />
        </div>
        <div className="flex w-full flex-grow flex-col py-5 md:w-[63%] md:text-left">
          <div className="flex flex-col-reverse items-center justify-center gap-5 md:flex-row md:justify-normal">
            <strong className="block text-4xl">{name}</strong>
            <EditProfileLink profileRoute={userProfileRoute} />
          </div>
          <span className="mt-2 block text-lg text-neutral-700">{email}</span>
          <p className="mt-4 text-lg">Find your favorite images, edit or download them for free.</p>
        </div>
      </div>
      <div className="h-[600px] w-full">
        <div className="sticky top-0 border-b border-neutral-600" style={trailerBorderStyle as any}>
          <ul className="mx-auto flex w-fit items-center gap-x-5 text-neutral-600 transition-all">
            {dashboardNavPages.map((page, id) => (
              <Link
                key={id}
                href={'/' + page}
                onClick={e => handleClick(e, page)}
                className={
                  'profile-page-link' + (currentPage == page ? ' text-dark dark:text-white' : '')
                }
              >
                {page}
              </Link>
            ))}
          </ul>
        </div>
        {children}
      </div>
    </>
  );
};
export default DashboardLayout;
