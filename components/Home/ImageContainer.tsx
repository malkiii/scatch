import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { easeInOutExpo } from '../../lib/easing';

const imagesPositions = [
  'top-16 -right-10',
  '-top-5 sm:-top-6 -left-5',
  '-bottom-10 left-10 sm:left-20'
];

const borderVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: '100%',
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: easeInOutExpo
    }
  }
};

const imageVariants = {
  hidden: { width: 0 },
  visible: {
    width: '100%',
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      ease: easeInOutExpo
    }
  }
};

const layerVariants = {
  hidden: { width: '100%' },
  visible: {
    width: 0,
    transition: {
      duration: 0.5,
      ease: easeInOutExpo
    }
  }
};

const ImageContainer: FC = () => {
  return (
    <motion.div
      className="relative w-full aspect-[560/400] lg:w-[560px]"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
    >
      <motion.div
        variants={borderVariants}
        className="h-full border-theme border-2"
      ></motion.div>
      {imagesPositions.map((position, index) => (
        <motion.div key={index} className={'hero-section-image ' + position}>
          <motion.div
            variants={imageVariants}
            className="h-full overflow-x-hidden absolute top-0 shadow-3xl"
          >
            <Image
              priority
              src={`/assets/hero-section/image-${index + 1}.jpeg`}
              alt="scatch"
              fill
            />
            <motion.div
              variants={layerVariants}
              className="absolute theme-gradient top-0 right-0 h-full"
            ></motion.div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};
export default ImageContainer;
