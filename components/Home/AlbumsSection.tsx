import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { easeOutExpo } from '@utils/easing';

const conntainerVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easeOutExpo
    }
  }
};
const albumVariants = {
  hidden: { x: '-100vw' },
  visible: {
    x: '-50%',
    transition: {
      duration: 0.6,
      ease: easeOutExpo
    }
  }
};

const animationProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.6 },
  transition: { staggerChildren: 0.1 }
};

const AlbumImage: FC<{ number: number }> = ({ number }) => {
  return (
    <>
      <Image
        priority
        src={`/assets/albums-section/image-${number}.jpeg`}
        className="w-full rounded-inherit"
        alt="album"
        fill
      />
      <span className="absolute bottom-3 left-4 opacity-70 font-bold">
        album
      </span>
    </>
  );
};

const AlbunmsContainer: FC = () => {
  const albumsNumber = 4;
  return (
    <motion.div
      {...animationProps}
      className="relative aspect-[500/430] w-full md:w-[500px] mt-10"
    >
      {new Array(4).fill(null).map((_, index) => {
        const positionY = albumsNumber * 10 - index * 15;
        const albumPosition = index != albumsNumber - 1 ? 60 : 0;
        return (
          <motion.div
            key={index}
            custom={index}
            variants={albumVariants}
            whileHover={{
              y: positionY + albumPosition + '%',
              transition: { duration: 0.4, type: 'spring' }
            }}
            className="album-example"
            style={{
              zIndex: index,
              y: positionY + '%'
            }}
          >
            <AlbumImage number={index + 1} />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const AlbumsSection: FC = () => {
  return (
    <motion.div
      {...animationProps}
      className="flex items-center flex-col-reverse lg:flex-row justify-center pt-10 pb-20 gap-x-10"
    >
      <AlbunmsContainer />
      <motion.div
        variants={conntainerVariants}
        className="max-w-[500px] text-center lg:text-left"
      >
        <h2>Create your own albums.</h2>
        <p className="text-xl mb-6">
          After creating your account, you can save images in albums which you
          can check later.
        </p>
        <Link href="/" className="theme-btn">
          See your albums
        </Link>
      </motion.div>
    </motion.div>
  );
};
export default AlbumsSection;
