import { FC } from 'react';
import Link from 'next/link';
import { easeExpInOut, easeExpOut } from '@malkiii/d3-ease';
import { AnimatePresence, motion } from 'framer-motion';
import { getUserProfileRoutes } from '@/utils';
import ColorSchemeButton from './ColorSchemeButton';

// animation variants
const transition = {
  duration: 0.8,
  ease: easeExpInOut,
  staggerChildren: 0.11
};

const menuVariants = {
  close: { x: 0, transition },
  open: { x: '-100%', transition }
};

const menuItemInit = { x: 550, opacity: 0 };
const menuItemVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easeExpOut
    }
  }
};

type MenuProps = NavMenuProps;
const MenuContainer: FC<MenuProps> = ({ toggle, username }) => {
  const profileRoutes = username ? getUserProfileRoutes(username) : null;
  const navMenuItems = [
    { name: 'home', route: '/' },
    profileRoutes
      ? { name: 'profile', route: profileRoutes.profileRoute }
      : { name: 'login', route: '/login' },
    { name: 'search', route: '/search' },
    { name: 'albums', route: profileRoutes ? profileRoutes.profileSubRoutes.albums : '/login' }
  ];

  return (
    <motion.div
      variants={menuVariants}
      animate="open"
      exit="close"
      className="fixed left-full top-0 z-[999] h-screen w-full bg-dark/90 px-10 text-4xl font-bold text-white"
    >
      <div className="w-full">
        <ul className="mt-24">
          {navMenuItems.map(({ name, route }, index) => (
            <motion.div key={index} variants={menuItemVariants} style={menuItemInit}>
              <Link className="nav-menu-link" href={route} onClick={toggle}>
                {name}
              </Link>
            </motion.div>
          ))}
        </ul>
        <motion.div variants={menuItemVariants} style={menuItemInit}>
          <ColorSchemeButton
            containerClassName="flex w-full items-center justify-between p-5 hover:text-theme transition-colors"
            buttonClassName="w-[57px] border-white after:bg-white group-hover:border-theme group-hover:after:bg-theme"
          >
            Dark
          </ColorSchemeButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

type NavMenuProps = {
  isMenuOpen: boolean;
  username?: string | null;
  toggle: () => void;
};
const NavbarMenu: FC<NavMenuProps> = props => {
  const { isMenuOpen } = props;
  return <AnimatePresence>{isMenuOpen && <MenuContainer {...props} />}</AnimatePresence>;
};
export default NavbarMenu;
