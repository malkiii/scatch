import Link from 'next/link';
import { motion } from 'framer-motion';
import { easeInOutExpo } from '../constants';
import DarkThemeButton from './DarkThemeButton';
import { Dispatch, SetStateAction, useEffect, useState, FC } from 'react';

type NavMenuProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const transition = {
  duration: 0.8,
  ease: easeInOutExpo
};
const buttonTransition = {
  duration: 0.7,
  ease: 'anticipate'
};

const transformValue = 180;

const menuButtonVariants = {
  hidden: {
    top: -112,
    transition: buttonTransition
  },
  visible: {
    top: 20,
    transition: buttonTransition
  }
};

const buttonTopVariants = {
  close: {
    y: 0,
    rotate: 0,
    transition
  },
  open: {
    y: transformValue + '%',
    rotate: -45,
    transition
  }
};
const buttonBottomVariants = {
  close: {
    y: 0,
    rotate: 0,
    width: '66%',
    transition
  },
  open: {
    y: -transformValue + '%',
    rotate: 45,
    width: '100%',
    transition
  }
};

const menuVariants = {
  close: {
    x: 0,
    transition
  },
  open: {
    x: '-100%',
    transition
  }
};

const navMenuLinks = ['home', 'login', 'search', 'albums'];

const NavbarMenu: FC<NavMenuProps> = ({ open, setOpen }) => {
  const [showButton, setShowButton] = useState<boolean>(false);

  function showButtonOnScroll() {
    const isWindowLarge = window.innerWidth > 768;
    const haspassedTheNavbar = window.scrollY > 50;
    setShowButton(!isWindowLarge && haspassedTheNavbar);
  }

  useEffect(() => {
    showButtonOnScroll();
    window.addEventListener('scroll', showButtonOnScroll);
    return () => {
      window.removeEventListener('scroll', showButtonOnScroll);
    };
  });

  return (
    <>
      <motion.button
        className="fixed -top-28 right-6 w-16 shadow-4xl transition-colors bg-theme dark:bg-white aspect-square rounded-circle z-[1000]"
        variants={menuButtonVariants}
        animate={open || showButton ? 'visible' : 'hidden'}
        onClick={() => setOpen(!open)}
      >
        <motion.div
          animate={open ? 'open' : 'close'}
          className="relative m-auto w-3/5 h-[22%]"
        >
          <motion.div
            variants={buttonTopVariants}
            className="absolute w-full h-[3px] top-0 bg-white dark:bg-dark right-0 transition-colors"
          ></motion.div>
          <motion.div
            variants={buttonBottomVariants}
            className="absolute w-[66%] h-[3px] bottom-0 bg-white dark:bg-dark right-0 transition-colors"
          ></motion.div>
        </motion.div>
      </motion.button>
      <motion.div
        variants={menuVariants}
        animate={open ? 'open' : 'close'}
        className="fixed top-0 left-full h-fill border-l-2 border-l-dark dark:border-l-white text-dark dark:text-white dark:bg-dark bg-white z-[999] w-full text-4xl font-bold px-10"
      >
        <div className="w-full">
          <ul className="mt-24">
            {navMenuLinks.map((url, index) => (
              <Link
                key={index}
                className="nav-menu-link"
                href={'/' + (index != 0 ? url : '')}
              >
                {url}
              </Link>
            ))}
          </ul>
          <DarkThemeButton
            containerClassName="flex w-full items-center justify-between p-5 capitalize"
            buttonClassName="w-[57px] h-7"
          />
        </div>
      </motion.div>
    </>
  );
};
export default NavbarMenu;
