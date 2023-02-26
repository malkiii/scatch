import Image from 'next/image';
import { easeInOutExpo } from '../../constants';
import { motion, useScroll, useTransform } from 'framer-motion';

export const heroSectionImages = [
  {
    url: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    position: 'top-16 -right-10'
  },
  {
    url: 'https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg',
    position: '-top-5 sm:-top-6 -left-5'
  },
  {
    url: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg',
    position: '-bottom-10 left-10 sm:left-20'
  }
];

const borderVariants = {
  hidden: { y: 500, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: easeInOutExpo
    }
  }
};

const imageVariants = {
  hidden: { x: '100vw', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easeInOutExpo
    }
  }
};

export default function ImageContainer(): JSX.Element {
  const { scrollY } = useScroll();
  const range = [0, 100];
  const options = { clamp: false };
  const y1 = useTransform(scrollY, range, [0, -5], options);
  const y2 = useTransform(scrollY, range, [0, -10], options);
  const y3 = useTransform(scrollY, range, [0, -15], options);
  const positions = [y1, y2, y3];

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
          style={{ y: positions[index] }}
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
