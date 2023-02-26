import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ThemeButton from './ThemeButton';
import { easeInOutExpo } from '../constants';

const navVariants = {
  hidden: { y: 200, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: easeInOutExpo
    }
  }
};

export default function Navbar(): JSX.Element {
  return (
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
        <div>
          <Link href="/" className="theme-link">
            Explore
          </Link>
          <Link href="/" className="theme-link">
            My albums
          </Link>
          <ThemeButton text="Login" />
        </div>
      </motion.nav>
    </header>
  );
}
