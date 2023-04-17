import { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { easeOutExpo } from '@utils/easing';
import { useInterval } from '@hooks/useInterval';

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
  hidden: { x: '-150vw' },
  visible: {
    x: 0,
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

const AlbunmsContainer: FC = () => {
  const albumsNumber = 4;
  const [albumIndex, setAlbumIndex, counter] = useInterval(albumsNumber, 2800);
  const imageIndex = albumIndex == -1 ? 0 : albumIndex;
  function albumImageURL(index: number) {
    return `url(/assets/albums-section/image-${index + 1}.jpeg)`;
  }

  return (
    <motion.div
      {...animationProps}
      className="relative w-full md:w-[500px] mt-10"
    >
      <div className="relative w-[90%] lg:group-hover:rotate-3d-right transition-transform duration-300">
        <motion.div
          variants={albumVariants}
          className="album-image"
          style={{ backgroundImage: albumImageURL(imageIndex) }}
          onUpdate={() => setAlbumIndex(0)}
        >
          <span className="absolute bottom-3 left-4 opacity-70 font-bold">
            album
          </span>
        </motion.div>
        {counter <= 0 && (
          <div
            className="absolute w-4/5 h-4/5 inset-0 m-auto -z-20 bg-cover bg-no-repeat"
            style={{ backgroundImage: albumImageURL(imageIndex + 1) }}
          ></div>
        )}
      </div>
    </motion.div>
  );
};

const AlbumsSection: FC = () => {
  return (
    <motion.div
      {...animationProps}
      className="group flex items-center flex-col-reverse lg:flex-row justify-center py-10 gap-x-10"
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
