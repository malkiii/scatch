import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { easeExpOut } from '@malkiii/d3-ease';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { getUserProfileRoutes } from '@/utils';

const conntainerVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easeExpOut
    }
  }
};
const albumVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easeExpOut
    }
  }
};
const AlbumImage: FC<{ number: number }> = ({ number }) => {
  return (
    <>
      <Image
        priority
        src={`/assets/Home/albums-section/image-${number}.jpeg`}
        className="w-full rounded-inherit transition-all duration-200 group-hover:scale-125"
        alt="album"
        fill
      />
      <span className="absolute bottom-2 left-3 font-bold opacity-70">album</span>
    </>
  );
};

const animationProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 1 },
  transition: { staggerChildren: 0.1 }
};

const AlbunmsContainer: FC = () => {
  const albumsNumber = 4;
  return (
    <motion.div
      {...animationProps}
      className="relative mt-10 grid aspect-[2298/1522] w-full grid-cols-2 grid-rows-2 items-center gap-4 md:w-[500px]"
    >
      {new Array(albumsNumber).fill(null).map((_, index) => {
        return (
          <motion.div
            key={index}
            custom={index}
            variants={albumVariants}
            className="album-image group overflow-hidden"
          >
            <AlbumImage number={index + 1} />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const AlbumsSection: FC = () => {
  const { data: session } = useSession();
  return (
    <motion.div className="flex flex-col-reverse items-center justify-center gap-x-10 py-10 lg:flex-row">
      <AlbunmsContainer />
      <motion.div
        {...animationProps}
        variants={conntainerVariants}
        className="max-w-[500px] text-center lg:text-left"
      >
        <h2>Create your own albums.</h2>
        <p className="mb-6 text-xl">
          After creating your account, you can save images in albums which you can check later.
        </p>
        <Link
          href={session ? getUserProfileRoutes(session.user.name!).profileSubRoutes.albums : '/'}
          className="theme-btn"
        >
          See your albums
        </Link>
      </motion.div>
    </motion.div>
  );
};
export default AlbumsSection;
