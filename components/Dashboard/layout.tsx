import Link from 'next/link';
import { User } from 'next-auth';
import { useRouter } from 'next/router';
import { FC, ReactNode, useRef, useState } from 'react';
import { MdEdit as EditIcon } from 'react-icons/md';
import { useScrolling } from '@/hooks/useScrolling';
import {
  BiImages as ImagesIcon,
  BiPhotoAlbum as AlbumsIcon,
  BiHeart as FavoriteIcon,
  BiLineChart as StatsIcon
} from 'react-icons/bi';

function resizeAvatar(avatarSrc?: string | null) {
  if (!avatarSrc) return null;
  if (avatarSrc.includes('lh3.googleusercontent.com')) {
    return avatarSrc.replace(/=s\d+(-c)?/g, '=s360');
  }
  return avatarSrc;
}

const EditProfileLink: FC<{ profileRoute: string }> = ({ profileRoute }) => {
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

const logoSize = 22;
const dashboardNavPages = [
  {
    name: 'images',
    icon: <ImagesIcon size={logoSize} />
  },
  {
    name: 'albums',
    icon: <AlbumsIcon size={logoSize} />
  },
  {
    name: 'favorite',
    icon: <FavoriteIcon size={logoSize} />
  },
  {
    name: 'stats',
    icon: <StatsIcon size={logoSize} />
  }
];

const DashboardNav: FC<{ profileRoute: string }> = ({ profileRoute }) => {
  const [currentPage, setCurrentPage] = useState<string>(dashboardNavPages[0].name);
  const [trailerBorderStyle, setTrailerBorderStyle] = useState({
    '--trailer-border-width': '100%',
    '--trailer-border-position': '0'
  });

  const navbarRef = useRef<HTMLDivElement>(null);
  useScrolling(() => {
    const isOnTop = navbarRef.current!.offsetTop - window.scrollY < 65;
    if (isOnTop) {
      document.querySelector('header')!.style.boxShadow = 'none';
      navbarRef.current!.classList.add('bg-cs-change');
      navbarRef.current!.classList.add('shadow-xl');
    } else {
      document.querySelector('header')!.style.boxShadow = '';
      navbarRef.current!.classList.remove('bg-cs-change');
      navbarRef.current!.classList.remove('shadow-xl');
    }
    return isOnTop;
  });

  function handleClick(e: any, page: string) {
    const link = e.currentTarget;
    setCurrentPage(page);

    setTrailerBorderStyle({
      '--trailer-border-width': link.offsetWidth + 'px',
      '--trailer-border-position': link.offsetLeft - link.parentElement!.offsetLeft + 'px'
    });
  }

  return (
    <div
      ref={navbarRef}
      className="sticky top-[64px] border-b border-neutral-600 transition-colors"
    >
      <div className="relatvie mx-auto max-w-7xl" style={trailerBorderStyle as any}>
        <ul className="flex items-center gap-x-5 text-neutral-600 transition-all duration-200">
          {dashboardNavPages.map(({ name: page, icon }, id) => (
            <Link
              key={id}
              href={profileRoute + '/' + page}
              onClick={e => handleClick(e, page)}
              className={
                'profile-page-link' + (currentPage == page ? ' text-dark dark:text-white' : '')
              }
            >
              {icon} {page}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

type LayoutProps = {
  user: User;
  children: ReactNode;
};
const DashboardLayout: FC<LayoutProps> = ({ user, children }) => {
  const { name, email, image } = user;

  const router = useRouter();
  const userProfileRoute = '/' + router.query.username;

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
      <div className="min-h-[600px] w-full">
        <DashboardNav profileRoute={userProfileRoute} />
        {children}
      </div>
    </>
  );
};
export default DashboardLayout;
