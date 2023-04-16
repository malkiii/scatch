import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { easeOutExpo } from '@utils/easing';
import { useEffect, useState, FC } from 'react';

const filters = [
  'after:opacity-0 after:mix-blend-difference',
  'after:opacity-60 after:mix-blend-overlay after:bg-amber-900',
  'after:opacity-0 after:mix-blend-overlay grayscale contrast-125',
  'after:opacity-25 after:mix-blend-difference after:bg-theme contrast-150'
];

const transition = {
  duration: 0.4,
  ease: easeOutExpo
};
const containerVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition
  }
};

const imageVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition
  }
};

const animationProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.6 }
};

const EditingSection: FC = () => {
  const [currentFilterIndex, setCurrentFilterIndex] = useState<number>(-1);
  const imageURL = '/assets/editing-image.jpeg';

  useEffect(() => {
    if (currentFilterIndex == -1) return;
    const interval = setInterval(() => {
      setCurrentFilterIndex(
        currentFilterIndex == filters.length - 1 ? 0 : currentFilterIndex + 1
      );
    }, 2200);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <motion.div className="flex items-center flex-col-reverse lg:flex-row justify-center pt-10 pb-36 gap-x-10">
      <Head>
        <link rel="preload" as="image" href={imageURL} />
      </Head>
      <div className="relative aspect-[609/761] w-full sm:w-[400px] mt-12 lg:mt-0">
        <motion.div
          {...animationProps}
          variants={imageVariants}
          onUpdate={() => setCurrentFilterIndex(0)}
          className="absolute w-full h-full overflow-hidden shadow-3xl"
        >
          <div
            className={
              'absolute w-full h-full overflow-hidden transition-all duration-1000 after:transition-inherit after:absolute after:w-full after:h-full after:pointer-events-none ' +
              filters[currentFilterIndex]
            }
          >
            <Image
              src={imageURL}
              alt="scatch edit"
              className="hover:scale-105 transition-transform duration-500"
              fill
            />
          </div>
        </motion.div>
      </div>
      <motion.div
        {...animationProps}
        variants={containerVariants}
        className="max-w-[550px] text-center lg:text-left"
      >
        <h2>Upload and Edit the images.</h2>
        <p className="text-xl mb-6">
          Upload images to the albums you create, and edit them with many
          features and filters.
        </p>
        <Link href="/search" className="theme-btn">
          Edit some picture
        </Link>
      </motion.div>
    </motion.div>
  );
};
export default EditingSection;
