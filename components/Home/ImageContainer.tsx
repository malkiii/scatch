import Image from 'next/image';
import { motion } from 'framer-motion';
import { easeInOutExpo } from '../../constants';

export const heroSectionImages = [
  {
    url: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    position: 'top-16 -right-10'
  },
  {
    url: 'https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg',
    position: '-top-10 -left-5'
  },
  {
    url: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg',
    position: '-bottom-5 left-20'
  }
];

const borderVariants = {
  hidden: { y: 500 },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      ease: easeInOutExpo
    }
  }
};

const imageVariants = {
  hidden: { x: 100 + 'vw' },
  visible: {
    x: 0,
    transition: {
      duration: 0.8,
      ease: easeInOutExpo
    }
  }
};

export default function ImageContainer(): JSX.Element {
  return (
    <motion.div
      className="relative w-full aspect-[560/400] lg:w-[560px]"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
    >
      <motion.div
        variants={borderVariants}
        className="w-full h-full border-theme border-2"
      ></motion.div>
      {heroSectionImages.map((image, index) => (
        <motion.div
          key={index}
          variants={imageVariants}
          className={'hero-section-image ' + image.position}
        >
          <Image
            src={image.url + '?auto=compress&cs=tinysrgb&w=1280'}
            alt={'image-' + index}
            fill
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
