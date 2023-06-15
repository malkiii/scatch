import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { easeExpOut } from '@malkiii/d3-ease';
import { useInterval } from '@/hooks/useInterval';
import { cn } from '@/utils';

const filters = [
  'after:opacity-0 after:mix-blend-difference',
  'after:opacity-60 after:mix-blend-overlay after:bg-amber-900',
  'after:opacity-0 after:mix-blend-overlay grayscale contrast-125',
  'after:opacity-25 after:mix-blend-difference after:bg-theme contrast-150'
];

const transition = {
  duration: 0.4,
  ease: easeExpOut
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
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition
  }
};

const animationProps = {
  initial: 'hidden',
  whileInView: 'visible'
};

type EditingImageProps = {
  filterClassName: string;
  onUpdate: () => void;
};

const EditingImage: FC<EditingImageProps> = ({ filterClassName, onUpdate }) => {
  const imageURL = '/assets/Home/editing-image.jpeg';
  return (
    <motion.div
      {...animationProps}
      viewport={{ once: true, amount: 0.84 }}
      className="relative mt-12 aspect-[609/761] w-[90%] sm:w-[400px]"
    >
      <motion.div
        variants={imageVariants}
        onUpdate={onUpdate}
        className="absolute h-full w-full overflow-hidden shadow-3xl"
      >
        <div
          className={cn(
            'after:transition-inherit absolute h-full w-full overflow-hidden rounded-lg border-2 border-white transition-all duration-1000 after:pointer-events-none after:absolute after:h-full after:w-full hover:border-theme hover:text-theme',
            filterClassName
          )}
        >
          <Image priority src={imageURL} alt="scatch edit" fill />
        </div>
      </motion.div>
    </motion.div>
  );
};

const EditingSection: FC = () => {
  const [filterIndex, setFilterIndex] = useInterval(filters.length, 2200);

  return (
    <motion.div className="group flex flex-col items-center justify-center gap-x-10 py-24 lg:flex-row">
      <motion.div
        {...animationProps}
        variants={containerVariants}
        viewport={{ once: true, amount: 0.95 }}
        className="max-w-[550px] text-center lg:text-left"
      >
        <h2>Upload and Edit the images.</h2>
        <p className="mb-6 text-xl">
          Upload images to the albums you create, and edit them with many features and filters.
        </p>
        <Link href="/search" className="theme-btn">
          Edit some picture
        </Link>
      </motion.div>
      <EditingImage filterClassName={filters[filterIndex]} onUpdate={() => setFilterIndex(0)} />
    </motion.div>
  );
};
export default EditingSection;
