import ImageContainer from './ImageContainer';
import { motion } from 'framer-motion';
import { easeInOutExpo } from '../../constants';

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

export default function HeroSection(): JSX.Element {
  return (
    <div className="pt-2 md:pt-20 lg:pt-36 pb-20 px-8 overflow-hidden">
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
            className="text-lg sm:text-2xl leading-relaxed mb-8 opacity-75"
          >
            Scatch is an online image gallery where you can find your favored
            images and edit, save, or download them for free with high
            resolution.
          </motion.p>
        </motion.div>
        <ImageContainer />
      </div>
    </div>
  );
}
