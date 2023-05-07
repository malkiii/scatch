import Link from 'next/link';
import { useEffect, useState, FC } from 'react';
import ColorSchemeButton from './ColorSchemeButton';
import { motion, AnimatePresence } from 'framer-motion';
import { easeExpInOut, easeExpOut } from '@malkiii/d3-ease';

// animation variants
const transition = {
  duration: 0.8,
  ease: easeExpInOut,
  staggerChildren: 0.11
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

const menuItemInit = { x: 550, opacity: 0 };
const menuItemVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: easeExpOut
    }
  }
};

type NavMenuProps = {
  isOpen: boolean;
  toggle: () => void;
};

type ButtonProps = NavMenuProps;

const MenuButton: FC<ButtonProps> = ({ isOpen, toggle }) => {
  return (
    <motion.button
      className="fixed -top-28 right-6 w-16 shadow-4xl transition-colors bg-theme dark:bg-white aspect-square rounded-circle z-[1000]"
      variants={menuButtonVariants}
      animate="visible"
      exit="hidden"
      onClick={toggle}
    >
      <motion.div
        animate={isOpen ? 'open' : 'close'}
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
  );
};

type MenuProps = {
  toggle: () => void;
};

const MenuContainer: FC<MenuProps> = ({ toggle }) => {
  const navMenuLinks = ['home', 'login', 'search', 'albums'];
  return (
    <motion.div
      variants={menuVariants}
      animate="open"
      exit="close"
      className="fixed top-0 left-full h-screen text-white bg-dark/90 z-[999] w-full text-4xl font-bold px-10"
    >
      <div className="w-full">
        <ul className="mt-24">
          {navMenuLinks.map((url, index) => (
            <motion.div
              key={index}
              variants={menuItemVariants}
              style={menuItemInit}
            >
              <Link
                className="nav-menu-link"
                href={index == 0 ? '/' : '/' + url}
                onClick={toggle}
              >
                {url}
              </Link>
            </motion.div>
          ))}
        </ul>
        <motion.div variants={menuItemVariants} style={menuItemInit}>
          <ColorSchemeButton
            containerClassName="flex w-full items-center justify-between p-5"
            buttonClassName="w-[57px] h-7 border-white after:bg-white"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const NavbarMenu: FC<NavMenuProps> = props => {
  const { isOpen, toggle } = props;
  const [canShowButton, setCanShowButton] = useState<boolean>(false);

  function showButtonOnScroll() {
    const isWindowLarge = window.innerWidth > 768;
    const haspassedTheNavbar = window.scrollY > 50;
    setCanShowButton(!isWindowLarge && haspassedTheNavbar);
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
      <AnimatePresence>
        {(isOpen || canShowButton) && <MenuButton {...props} />}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && <MenuContainer toggle={toggle} />}
      </AnimatePresence>
    </>
  );
};
export default NavbarMenu;
