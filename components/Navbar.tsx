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
  staggerChildren: 0.11
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
  isOpen: boolean;
  toggleMenu: () => void;
};
const MenuButton: FC<ButtonProps> = ({ isOpen, toggleMenu }) => {
  return (
    <motion.button
      className="block w-10 transition-colors aspect-square md:hidden ml-2"
      onClick={toggleMenu}
    >
      <motion.div animate={isOpen ? 'open' : 'close'} className="relative m-auto w-full h-1/3">
        <motion.div
          variants={buttonTopVariants}
          className="absolute w-full h-[3.2px] top-0 bg-dark dark:bg-white right-0 transition-colors"
        ></motion.div>
        <motion.div
          variants={buttonBottomVariants}
          className="absolute w-[66%] h-[3.2px] bottom-0 bg-dark dark:bg-white right-0 transition-colors"
        ></motion.div>
      </motion.div>
    </motion.button>
  );
};

const Logo: FC = () => {
  return (
    <Link href="/" className="relative h-full w-fit" tabIndex={-1}>
      <Image src="/logotype.svg" alt="scatch logo" width={144} height={39} className="logo" />
    </Link>
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
    <div className="flex items-center gap-x-2 max-w-2xl mr-2">
      <Link href="/" tabIndex={-1}>
        <Image src="/mark.svg" alt="scatch mark" width={39} height={39} className="logo" />
      </Link>
      <div className="border-2 border-neutral-500 dark:bg-dark/50 bg-white/50 dark:focus-within:border-white focus-within:border-dark transition-colors rounded-3xl h-full w-full flex items-center">
        <button
          onClick={() => triggerTheSearch()}
          className="hover:text-theme transition-colors px-4"
        >
          <SearchIcon size={22} />
        </button>
        <input
          type="search"
          ref={inputRef}
          placeholder="Search.."
          className="h-full w-full outline-none bg-transparent py-2"
          onInput={handleInput}
          onKeyDown={handleEnter}
          autoComplete="off"
        />
        {showClearButton && (
          <button
            className="hover:text-theme transition-colors border-l px-4"
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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inHomePage = router.pathname == '/';

  const isScrolling = useScrolling(() => {
    return !inHomePage && window.scrollY > 10;
  });

  const shouldShowSearchInput = useScrolling(() => {
    return !inHomePage && window.scrollY > 150;
  });

  function toggleMenu() {
    setIsOpen(!isOpen);
    disableScrolling();
  }

  function disableScrolling() {
    const bodyClasses = document.body.classList;
    const isOnMobile = navigator.userAgent.includes('Mobile');
    if (isOnMobile && !isOpen) bodyClasses.add('overflow-y-hidden');
    else bodyClasses.remove('overflow-y-hidden');
  }

  const animationProps = inHomePage
    ? { variants: navVariants, initial: 'hidden', animate: 'visible' }
    : null;

  return (
    <>
      <header
        className={
          'py-3 w-full px-5 z-[1001] transition-[box-shadow_color] duration-200' +
          (inHomePage ? ' absolute' : ' fixed') +
          (isScrolling ? ' bg-cs-change shadow-xl' : '')
        }
      >
        <motion.nav
          {...animationProps}
          className="flex items-center justify-between max-w-7xl h-full mx-auto"
        >
          <div className="h-[41px] overflow-hidden flex-1">
            <div
              className={
                'transition-transform flex gap-y-1 justify-center flex-col' +
                (!shouldShowSearchInput ? ' -translate-y-[calc(50%+1px)]' : '')
              }
            >
              <FixedSearchInput />
              <Logo />
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex items-center">
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
            <MenuButton {...{ isOpen, toggleMenu }}></MenuButton>
          </div>
        </motion.nav>
      </header>
      <NavbarMenu isOpen={isOpen} hasSession={!!session} toggle={toggleMenu} />
    </>
  );
};
export default withRouter(Navbar);
