import Link from 'next/link';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DarkThemeButton from './DarkThemeButton';
import { easeInOutExpo } from '../constants';

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

const transformValue = 150;

const menuButtonVariants = {
  hidden: {
    y: 0,
    transition: buttonTransition
  },
  visible: {
    y: 120,
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

const navMenuLinks = ['home', 'explore', 'albums', 'about'];

export default function NavbarMenu({ open, setOpen }: NavMenuProps) {
  const [scrollY, setScrollY] = useState<number>(0);

  function updateScrollY() {
    setScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener('scroll', updateScrollY);
    return () => {
      window.removeEventListener('scroll', updateScrollY);
    };
  });

  return (
    <>
      <motion.button
        className="fixed -top-20 md:hidden right-6 w-14 shadow-4xl text-dark bg-white aspect-square rounded-circle z-[1000]"
        variants={menuButtonVariants}
        animate={open || scrollY > 50 ? 'visible' : 'hidden'}
        onClick={() => setOpen(!open)}
      >
        <motion.div
          animate={open ? 'open' : 'close'}
          className="relative m-auto w-3/5 h-[22%]"
        >
          <motion.div
            variants={buttonTopVariants}
            className="absolute w-full h-[3px] top-0 bg-dark right-0"
          ></motion.div>
          <motion.div
            variants={buttonBottomVariants}
            className="absolute w-[66%] h-[3px] bottom-0 bg-dark right-0"
          ></motion.div>
        </motion.div>
      </motion.button>
      <motion.div
        variants={menuVariants}
        animate={open ? 'open' : 'close'}
        className="fixed top-0 left-full border-l-2 h-screen text-white bg-dark z-[999] w-full text-4xl font-bold px-10"
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
            buttonClassName="w-16 h-7"
          />
        </div>
      </motion.div>
    </>
  );
}
