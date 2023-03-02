import Image from 'next/image';
import { motion } from 'framer-motion';
import ThemeButton from '../ThemeButton';
import { useEffect, useState, FC } from 'react';
import { easeInOutExpo } from '../../constants';

const filters = [
  'after:opacity-0 after:mix-blend-difference',
  'after:opacity-60 after:mix-blend-overlay after:bg-amber-900',
  'after:opacity-0 after:mix-blend-overlay grayscale contrast-125',
  'after:opacity-25 after:mix-blend-difference after:bg-theme contrast-150'
];

const transition = {
  duration: 0.4,
  ease: easeInOutExpo
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

const EditingSection: FC = () => {
  const [currentFilterIndex, setCurrentFilterIndex] = useState<number>(-1);

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
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="flex items-center flex-col-reverse lg:flex-row justify-center pt-10 pb-36 gap-x-10 overflow-hidden"
    >
      <div className="relative aspect-[609/761] w-full sm:w-[400px] mt-12 md:mt-0">
        <motion.div
          variants={imageVariants}
          onUpdate={() => setCurrentFilterIndex(0)}
          className="absolute w-full h-full"
        >
          <div
            className={
              'absolute w-full h-full transition-all duration-1000 after:transition-inherit after:absolute after:w-full after:h-full ' +
              filters[currentFilterIndex]
            }
          >
            <Image src="/assets/editing-image.jpeg" alt="editing-image" fill />
          </div>
        </motion.div>
      </div>
      <motion.div
        variants={containerVariants}
        className="max-w-[550px] text-center lg:text-left"
      >
        <h2>Upload and Edit the images.</h2>
        <p className="text-xl mb-6">
          Upload images to the albums you create, and edit them with many
          features and filters.
        </p>
        <ThemeButton text="Edit some pictures" />
      </motion.div>
    </motion.div>
  );
};
export default EditingSection;
