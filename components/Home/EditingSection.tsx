import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ThemeButton from '../ThemeButton';

const filters = [
  'after:opacity-0 after:mix-blend-difference',
  'after:opacity-60 after:mix-blend-overlay after:bg-amber-900',
  'after:opacity-0 after:mix-blend-overlay grayscale contrast-125',
  'after:opacity-25 after:mix-blend-difference after:bg-theme contrast-150'
];

export default function EditingSection() {
  const [currentFilterIndex, setCurrentFilterIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFilterIndex(
        currentFilterIndex == filters.length - 1 ? 0 : currentFilterIndex + 1
      );
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="flex items-center justify-center py-20 gap-x-10">
      <div className="relative aspect-[609/761] w-[400px] overflow-hidden">
        <motion.div
          className={
            'absolute w-full h-full transition-all duration-1000 after:transition-inherit after:absolute after:w-full after:h-full ' +
            filters[currentFilterIndex]
          }
        >
          <Image
            src="https://images.pexels.com/photos/7537866/pexels-photo-7537866.jpeg"
            alt="editing-image"
            fill
          />
        </motion.div>
      </div>
      <div className="max-w-[550px]">
        <h2>Upload and Edit the images.</h2>
        <p className="text-xl mb-6">
          Upload images to the albums you create, and edit them with many
          features and filters.
        </p>
        <ThemeButton text="Edit some pictures" />
      </div>
    </div>
  );
}
