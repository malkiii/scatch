import { FC, useRef } from 'react';
import { motion } from 'framer-motion';
import ImageContainer from './ImageContainer';
import { easeInOutExpo } from '../../constants';
import Link from 'next/link';

const textVariants = {
  hidden: { y: 400, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easeInOutExpo
    }
  }
};

const containerImagesSpeeds = [-2, 2, 4];

const HeroSection: FC = () => {
  const containerImagesRefs = useRef<HTMLDivElement[]>([]);

  function handleMouseMove(e: any) {
    const isOnMobile = navigator.userAgent.includes('Mobile');
    if (isOnMobile) return;
    containerImagesRefs.current.forEach((image, index) => {
      const speed = containerImagesSpeeds[index];
      const x = (window.innerWidth - e.pageX * speed) / 100;
      const y = (window.innerHeight - e.pageY * speed) / 100;
      image.style.translate = `${x}px ${y}px`;
    });
  }

  return (
    <div
      className="pt-2 md:pt-20 lg:pt-36 pb-20"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseMove}
    >
      <div className="flex justify-center items-center gap-8 mx-auto max-w-7xl flex-col lg:flex-row">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <motion.h1 variants={textVariants} className="my-4">
            welcome to{' '}
            <span className="relative inline-block text-transparent bg-clip-text theme-gradient after:absolute after:w-0 after:h-1 after:theme-gradient after:left-0 after:-bottom-2 hover:after:w-full after:transition-all">
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
        <ImageContainer refs={containerImagesRefs} />
      </div>
    </div>
  );
};
export default HeroSection;
