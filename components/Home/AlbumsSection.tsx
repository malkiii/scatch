import Image from 'next/image';
import { motion } from 'framer-motion';
import ThemeButton from '../ThemeButton';
import { easeInOutExpo } from '../../constants';

const conntainerVariants = {
  hidden: { y: 500, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: easeInOutExpo
    }
  }
};
const albumVariants = {
  hidden: { x: '100vw' },
  visible: {
    x: '-50%',
    transition: {
      duration: 0.8,
      ease: easeInOutExpo
    }
  }
};

const transition = {
  staggerChildren: 0.1
};
const viewport = {
  once: true,
  amount: 0.25
};

const albumsNumber = 4;

export default function AlbumsSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={transition}
      className="flex items-center flex-col lg:flex-row justify-center pt-10 pb-32 gap-x-10 px-8"
    >
      <motion.div
        variants={conntainerVariants}
        className="max-w-[500px] text-center lg:text-left"
      >
        <h2>Create your own albums.</h2>
        <p className="text-xl mb-6">
          After creating your account, you can save images in albums which you
          can check later.
        </p>
        <ThemeButton text="See your albums" />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={transition}
        className="relative aspect-[500/430] w-full md:w-[500px] mt-10"
      >
        {new Array(4).fill(null).map((_, index) => {
          const positionY = albumsNumber * 10 - index * 15;
          return (
            <motion.div
              key={index}
              custom={index}
              variants={albumVariants}
              whileHover={{
                y: positionY + (index != albumsNumber - 1 ? 60 : 0) + '%',
                transition: { duration: 0.4, type: 'spring' }
              }}
              className="album-example"
              style={{
                zIndex: index,
                y: positionY + '%'
              }}
            >
              <Image
                src={`/assets/albums-section/image-${index + 1}.jpeg`}
                className="w-full rounded-inherit"
                alt="album"
                fill
              />
              <span className="absolute bottom-3 left-4 opacity-70 font-bold">
                album
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
