import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import {
  BiPhotoAlbum as AlbumIcon,
  BiSearchAlt as ImageSearchIcon,
  BiLogInCircle as LogInIcon,
  BiLogOutCircle as LogOutIcon,
  BiMoon as MoonIcon,
  BiUserCircle as ProfileIcon,
  BiCog as SettingsIcon,
  BiLineChart as StatsIcon
} from 'react-icons/bi';
import { CgSearch as SearchIcon } from 'react-icons/cg';
import { MdClear as ClearIcon } from 'react-icons/md';
import { AppPropsWithLayout } from '@/types';
import { cn, disableScrolling, getUserProfileRoutes } from '@/utils';
import { useScrollEvent } from '@/hooks/useScrollEvent';
import { useSearchTrigger } from '@/hooks/useSearchTrigger';
import { useToggleMenu } from '@/hooks/useToggleMenu';
import ColorSchemeButton from './ColorSchemeButton';

const AvatarIcon: FC<{ user: User }> = ({ user }) => {
  return (
    <img
      src={user.image || '/assets/avatar-placeholder.png'}
      alt={user.name || 'scatch avatar'}
      className="w-10"
      referrerPolicy="no-referrer"
    />
  );
};

function getNavbarMenuItems(user?: User) {
  const menuIconSize = 22;
  const csButton = (
    <label className="flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <MoonIcon size={menuIconSize} /> Dark
      </div>
      <ColorSchemeButton />
    </label>
  );
  const logoutButton = (
    <button className="flex items-center gap-x-3" onClick={() => signOut()}>
      <LogOutIcon size={menuIconSize} />
      Log Out
    </button>
  );

  const imageSearchItem = {
    name: 'Search for images',
    url: '/search',
    icon: <ImageSearchIcon size={menuIconSize} />
  };

  return (
    user
      ? [
          {
            name: 'View profile',
            url: '/login',
            icon: <ProfileIcon size={menuIconSize} />
          },
          {
            name: 'Your albums',
            url: '/login',
            icon: <AlbumIcon size={menuIconSize} />
          },
          {
            name: 'Your stats',
            url: '/login',
            icon: <StatsIcon size={menuIconSize} />
          },
          imageSearchItem,
          '',
          {
            name: 'Settings',
            url: '/settings',
            icon: <SettingsIcon size={menuIconSize} />
          },
          csButton,
          '',
          logoutButton
        ]
      : [
          {
            name: 'Login',
            url: '/login',
            icon: <LogInIcon size={menuIconSize} />
          },
          imageSearchItem,
          '',
          csButton
        ]
  ).map((item, i) =>
    typeof item === 'string' ? (
      <div key={i} className="divider my-2"></div>
    ) : (
      <li key={i}>
        {'type' in item ? (
          item
        ) : (
          <Link href={item.url} className="flex items-center gap-x-3">
            {item.icon} {item.name}
          </Link>
        )}
      </li>
    )
  );
}

type NavbarMenuProps = {
  user?: User;
};
const NavbarMenu: FC<NavbarMenuProps> = ({ user }) => {
  const { isOpen, toggle } = useToggleMenu();

  function toggleMenu() {
    toggle();
    disableScrolling(!isOpen);
  }

  return (
    <>
      {user ? (
        <button
          onClick={toggleMenu}
          className="ml-3 overflow-hidden rounded-circle outline outline-0 outline-black/10 transition-all hover:outline-[5px] dark:outline-white/10 md:ml-10"
        >
          <AvatarIcon user={user} />
        </button>
      ) : (
        <button
          onClick={toggleMenu}
          className="group flex aspect-square w-8 items-center md:hidden"
        >
          <div className="before:h-inherit after:h-inherit relative h-[2px] w-full rounded-full bg-base-content transition-colors before:absolute before:-top-2 before:right-0 before:inline-block before:w-4/5 before:rounded-full before:bg-inherit after:absolute after:-bottom-2 after:right-0 after:inline-block after:w-3/5 after:rounded-full after:bg-inherit group-hover:bg-primary"></div>
        </button>
      )}
      <div
        onClick={e => e.target == e.currentTarget && toggleMenu()}
        className={cn('fixed inset-0 overflow-hidden duration-300 ease-out-expo', {
          'pointer-events-none bg-black/0': !isOpen,
          'bg-black/50': isOpen
        })}
      >
        <div
          className={cn(
            'fixed right-0 top-0 flex h-screen w-[380px] flex-col gap-y-4 bg-base-100 px-2 py-7 shadow-2xl duration-500 ease-out-expo dark:bg-neutral',
            { 'translate-x-full': !isOpen, 'translate-x-0': isOpen }
          )}
        >
          <div className="flex w-full items-center px-6">
            {user && (
              <div className="overflow-hidden rounded-circle">
                <AvatarIcon user={user} />
              </div>
            )}
            <button
              onClick={toggleMenu}
              className="btn-primary btn-outline btn ml-auto h-fit min-h-0 px-2 py-2"
            >
              <ClearIcon size={23} />
            </button>
          </div>
          {user && (
            <div className="px-6">
              <span className="block font-semibold">{user.name}</span>
              <span className="block text-base-content/60">{user.email}</span>
            </div>
          )}
          <ul className="menu gap-y-2 text-lg">{getNavbarMenuItems(user)}</ul>
        </div>
      </div>
    </>
  );
};

const Logotype: FC = () => {
  return (
    <div className="relative overflow-hidden py-1">
      <Link href="/" className="-ml-11 block h-[40px] w-[150px] pl-[6px]" tabIndex={-1}>
        <img
          src="/logotype.svg"
          alt="scatch logo"
          className="logo h-full w-full"
          style={{ clipPath: 'inset(0 0 0 30%)' }}
        />
      </Link>
    </div>
  );
};

const FixedSearchInput: FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const { inputRef, triggerTheSearch, handleEnter } = useSearchTrigger();
  const [showClearButton, setShowClearButton] = useState<boolean>(false);

  function handleInput() {
    const input = inputRef.current;
    if (input) setShowClearButton(input.value.length > 0);
  }

  return (
    <div className="ml-[6px] mr-2 flex max-w-xl items-center gap-x-2">
      <div className="input-primary input flex h-full w-full items-center border-2 px-2 py-0">
        <button
          onClick={async () => await triggerTheSearch()}
          className="transition-colors hover:text-primary"
        >
          <SearchIcon size={22} />
        </button>
        <input
          type="search"
          ref={inputRef}
          placeholder="Search.."
          defaultValue={searchQuery}
          data-test="navbar-search-input"
          className="h-[40px] w-full bg-transparent p-2 outline-none"
          onInput={handleInput}
          onKeyDown={handleEnter}
          autoComplete="off"
        />
        {showClearButton && (
          <button
            className="transition-colors hover:text-primary"
            onClick={() => {
              inputRef.current!.value = '';
              setShowClearButton(false);
            }}
          >
            <ClearIcon size={22} />
          </button>
        )}
      </div>
    </div>
  );
};

const Navbar: FC<{ session: AppPropsWithLayout['currentSession'] }> = ({ session }) => {
  const router = useRouter();

  const { pathname } = router;
  const isExcludedPage = ['/', '//about', '/blog'].includes(pathname);

  const navLinks = [
    {
      name: 'Search',
      url: '/search'
    },
    {
      name: 'My albums',
      url: session ? getUserProfileRoutes(session.user.name!).profileSubRoutes.albums : '/login'
    },
    {
      name: 'About',
      url: '/about'
    }
  ];

  const isScrolling = useScrollEvent(() => !isExcludedPage && window.scrollY > 10);
  const shouldShowSearchInput = useScrollEvent(() => !isExcludedPage && window.scrollY > 150);

  function getSearchQuery() {
    return pathname.startsWith('/search')
      ? !router.asPath.startsWith('/image')
        ? (router.query.query as string)
        : null
      : '';
  }
  const [searchQuery, setSearchQuery] = useState<string | null>(getSearchQuery());
  useEffect(() => {
    const currentSearchQuery = getSearchQuery();
    if (currentSearchQuery !== null) setSearchQuery(currentSearchQuery);
  }, [router]);

  return (
    <header
      className={cn(
        'z-[1001] mr-4 h-[65px] w-[calc(100vw-1rem)] transition-[box-shadow_color] duration-200',
        { 'bg-base-300 shadow-xl dark:bg-neutral': isScrolling },
        isExcludedPage ? 'absolute' : 'fixed'
      )}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between">
        <Link href="/" tabIndex={-1} className="relative block aspect-square h-[39px]">
          <Image src="/mark.svg" alt="scatch mark" className="logo" fill />
        </Link>
        <div className="flex h-[45px] flex-1 flex-col justify-end overflow-hidden">
          <div
            className={cn('relative bottom-0 transition-transform', {
              'translate-y-[48px]': shouldShowSearchInput
            })}
          >
            <FixedSearchInput searchQuery={searchQuery || ''} />
            <Logotype />
          </div>
        </div>
        <div className="flex items-center">
          <div className="hidden items-center gap-x-10 md:flex">
            {navLinks.map(({ name, url }) => (
              <Link key={name} href={url} className="theme-link">
                {name}
              </Link>
            ))}
            {!session && (
              <>
                <label className="theme-link inline-flex cursor-pointer items-center gap-3">
                  <span>Dark</span>
                  <ColorSchemeButton className="contrast-125 hover:border-primary hover:bg-primary group-hover:border-primary group-hover:bg-primary" />
                </label>
                <Link href="/login" className="theme-btn">
                  Login
                </Link>
              </>
            )}
          </div>
          <NavbarMenu user={session?.user} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
