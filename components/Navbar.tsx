import Link from 'next/link';
import Image from 'next/image';
import { FC, useState } from 'react';
import NavbarMenu from './NavbarMenu';
import { motion } from 'framer-motion';
import { easeInOutExpo } from '../lib/easing';
import ColorSchemeButton from './ColorSchemeButton';
import { withRouter, NextRouter } from 'next/router';

type NavbarProps = {
  router: NextRouter;
};

const navVariants = {
  hidden: { y: 200, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easeInOutExpo
    }
  }
};

const Navbar: FC<NavbarProps> = ({ router }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function toggleMenu() {
    setIsOpen(!isOpen);
    disableScrolling();
  }

  function disableScrolling() {
    const bodyClasses = document.body.classList;
    const isOnMobile = navigator.userAgent.includes('Mobile');
    if (isOnMobile) bodyClasses.add('overflow-y-hidden');
    else bodyClasses.remove('overflow-y-hidden');
  }

  const animationProps =
    router.pathname == '/'
      ? { variants: navVariants, initial: 'hidden', animate: 'visible' }
      : null;

  return (
    <>
      <header className="relative h-20 w-full px-8">
        {undefined}
        <motion.nav
          {...animationProps}
          className="flex items-center justify-between max-w-7xl h-full mx-auto overflow-y-hidden"
        >
          <Link href="/">
            <Image
              src="/logotype.svg"
              alt="Logo"
              width={144}
              height={39}
              className="logo"
            />
          </Link>
          <div className="hidden md:flex items-center">
            <Link href="/search" className="theme-link">
              Search
            </Link>
            <Link href="/albums" className="theme-link">
              My albums
            </Link>
            <Link href="/" className="theme-btn">
              Login
            </Link>
            <ColorSchemeButton className="text-3xl ml-7" />
          </div>
          <button className="nav-menu-btn" onClick={toggleMenu}></button>
        </motion.nav>
      </header>
      <NavbarMenu isOpen={isOpen} onClick={toggleMenu} />
    </>
  );
};
export default withRouter(Navbar);
