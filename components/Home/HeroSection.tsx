import { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ImageContainer from './ImageContainer';
import { easeInOutExpo } from '../../utils/easing';

const textVariants = {
  hidden: { y: 300, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easeInOutExpo
    }
  }
};

const HeroSection: FC = () => {
  return (
    <div className="pt-2 md:pt-20 lg:pt-36 pb-20">
      <div className="flex justify-center items-center gap-8 mx-auto max-w-7xl flex-col lg:flex-row">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <motion.h1 variants={textVariants} className="my-4">
            welcome to{' '}
            <span className="text-transparent bg-clip-text theme-gradient">
              Scatch
            </span>
          </motion.h1>
          <motion.p
            variants={textVariants}
            className="text-lg sm:text-2xl leading-relaxed mb-4 md:mb-7 opacity-75"
          >
            Scatch is an online image gallery where you can find your favored
            images and edit, save, or download them for free with high
            resolution.
          </motion.p>
          <motion.div variants={textVariants} className="inline-block">
            <Link href="/search" className="theme-btn text-lg mb-5">
              Get Started
            </Link>
          </motion.div>
        </motion.div>
        <ImageContainer />
      </div>
    </div>
  );
};
export default HeroSection;
