import Link from 'next/link';
import Image from 'next/image';
import { FC, useState } from 'react';
import NavbarMenu from './NavbarMenu';
import AvatarMenu from './AvatarMenu';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { easeExpInOut } from '@malkiii/d3-ease';
import ColorSchemeButton from './ColorSchemeButton';
import { withRouter, NextRouter } from 'next/router';
import { useScrolling } from '@/hooks/useScrolling';
import { CgSearch as SearchIcon } from 'react-icons/cg';
import { useSearchTrigger } from '@/hooks/useSearchTrigger';
import { MdClear as ClearIcon } from 'react-icons/md';

// animation variants
const transition = {
  duration: 0.8,
  ease: easeExpInOut,
  staggerChildren: 0.1
};
const transformValue = 146;
const buttonTopVariants = {
  close: { y: 0, rotate: 0, transition },
  open: { y: transformValue + '%', rotate: -45, transition }
};
const buttonBottomVariants = {
  close: { y: 0, rotate: 0, width: '66%', transition },
  open: { y: -transformValue + '%', rotate: 45, width: '100%', transition }
};

type ButtonProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};
const MenuButton: FC<ButtonProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <motion.button
      className="ml-3 block aspect-square w-10 transition-colors md:hidden"
      onClick={toggleMenu}
    >
      <motion.div animate={isMenuOpen ? 'open' : 'close'} className="relative m-auto h-1/3 w-full">
        <motion.div
          variants={buttonTopVariants}
          className={
            'absolute right-0 top-0 h-[3.2px] w-full transition-colors ' +
            (isMenuOpen ? ' bg-white' : 'bg-dark dark:bg-white')
          }
        ></motion.div>
        <motion.div
          variants={buttonBottomVariants}
          className={
            'absolute bottom-0 right-0 h-[3.2px] w-[66%] bg-dark transition-colors dark:bg-white' +
            (isMenuOpen ? ' bg-white' : 'bg-dark dark:bg-white')
          }
        ></motion.div>
      </motion.div>
    </motion.button>
  );
};

const Logo: FC<{ isMenuOpen: boolean }> = ({ isMenuOpen }) => {
  return (
    <div className="relative overflow-hidden">
      <Link href="/" className="-ml-11 block h-[40px] w-[144px] pl-[6px]" tabIndex={-1}>
        <img
          src="/logotype.svg"
          alt="scatch logo"
          className={'logo h-full w-full' + (isMenuOpen ? ' force-white' : '')}
          style={{ clipPath: 'inset(0 0 0 30%)' }}
        />
      </Link>
    </div>
  );
};

const FixedSearchInput: FC = () => {
  const { inputRef, triggerTheSearch, handleEnter } = useSearchTrigger();
  const [showClearButton, setShowClearButton] = useState<boolean>(false);

  function handleInput() {
    const input = inputRef.current;
    if (input) setShowClearButton(input.value.length > 0);
  }

  return (
    <div className="ml-[6px] mr-2 flex max-w-2xl items-center gap-x-2">
      <div className="flex h-full w-full items-center rounded-3xl border-2 border-neutral-500 bg-white/50 px-3 transition-colors focus-within:border-dark dark:bg-dark/50 dark:focus-within:border-white">
        <button onClick={() => triggerTheSearch()} className="transition-colors hover:text-theme">
          <SearchIcon size={22} />
        </button>
        <input
          type="search"
          ref={inputRef}
          placeholder="Search.."
          className="h-full w-full bg-transparent p-2 outline-none"
          onInput={handleInput}
          onKeyDown={handleEnter}
          autoComplete="off"
        />
        {showClearButton && (
          <button
            className="transition-colors hover:text-theme"
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

const navVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: easeExpInOut } }
};

type NavbarProps = {
  router: NextRouter;
};
const Navbar: FC<NavbarProps> = ({ router }) => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { pathname } = router;
  const isExcludedPage = ['/', '/about', '/blog'].includes(pathname);

  const isScrolling = useScrolling(() => !isExcludedPage && window.scrollY > 10);
  const shouldShowSearchInput = useScrolling(() => !isExcludedPage && window.scrollY > 150);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
    disableScrolling();
  }

  function disableScrolling() {
    const bodyClasses = document.body.classList;
    const isOnMobile = navigator.userAgent.includes('Mobile');
    if (isOnMobile && !isMenuOpen) bodyClasses.add('overflow-y-hidden');
    else bodyClasses.remove('overflow-y-hidden');
  }

  const animationProps =
    pathname == '/' ? { variants: navVariants, initial: 'hidden', animate: 'visible' } : null;

  return (
    <>
      <header
        className={
          'z-[1001] w-full px-5 py-3 transition-[box-shadow_color] duration-200' +
          (isExcludedPage ? ' absolute' : ' fixed') +
          (isScrolling ? ' bg-cs-change shadow-xl' : '')
        }
      >
        <div className="h-full w-full">
          <motion.nav
            {...animationProps}
            className="mx-auto flex h-full max-w-7xl items-center justify-between"
          >
            <Link href="/" tabIndex={-1} className="relative block aspect-square h-[39px]">
              <Image
                src="/mark.svg"
                alt="scatch mark"
                className={'logo' + (isMenuOpen ? ' force-white' : '')}
                fill
              />
            </Link>
            <div className="h-[41px] flex-1 overflow-hidden">
              <div
                className={
                  'flex flex-col justify-center gap-y-1 transition-transform' +
                  (!shouldShowSearchInput ? ' -translate-y-[calc(50%+1px)]' : '')
                }
              >
                <FixedSearchInput />
                <Logo {...{ isMenuOpen }} />
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden items-center md:flex">
                <Link href="/search" className="theme-link">
                  Search
                </Link>
                <Link href="/albums" className="theme-link">
                  My albums
                </Link>
                <Link href="/about" className="theme-link">
                  About
                </Link>
                {!session && (
                  <>
                    <ColorSchemeButton
                      containerClassName="inline-flex items-center gap-3 mr-10 transition-colors hover:text-theme"
                      buttonClassName="w-10 group-hover:border-theme group-hover:after:bg-theme"
                    >
                      Dark
                    </ColorSchemeButton>
                    <Link href="/login" className="theme-btn">
                      Login
                    </Link>
                  </>
                )}
              </div>
              {session && <AvatarMenu user={session.user} />}
              <MenuButton {...{ isMenuOpen, toggleMenu }}></MenuButton>
            </div>
          </motion.nav>
        </div>
      </header>
      <NavbarMenu isMenuOpen={isMenuOpen} username={session?.user.name} toggle={toggleMenu} />
    </>
  );
};
export default withRouter(Navbar);
