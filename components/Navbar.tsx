import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { easeInOutExpo } from '../constants';
import { useState } from 'react';
import NavbarMenu from './NavbarMenu';
import DarkThemeButton from './DarkThemeButton';

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

export default function Navbar(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <header className="relative h-20 w-full px-8">
        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between max-w-7xl h-full mx-auto overflow-y-hidden"
        >
          <Link href="/">
            <Image src="/logotype.svg" alt="Logo" width={144} height={36} />
          </Link>
          <div className="hidden md:block">
            <Link href="/" className="theme-link">
              Explore
            </Link>
            <Link href="/" className="theme-link">
              My albums
            </Link>
            <Link href="/" className="theme-link">
              About
            </Link>
            <DarkThemeButton
              containerClassName="inline-flex items-center gap-3 pl-10 border-l-2 border-white/40"
              buttonClassName="w-10 h-5"
            />
          </div>
          <button
            className="nav-menu-btn"
            onClick={() => setOpen(!open)}
          ></button>
        </motion.nav>
      </header>
      <NavbarMenu open={open} setOpen={setOpen} />
    </>
  );
}
