import Image from 'next/image';
import { motion, useAnimationControls } from 'framer-motion';
import { albumsSectionImages } from '../../constants';
import { useEffect } from 'react';

const albumsNumber = albumsSectionImages.length;

export default function EditingSection() {
  const controls = useAnimationControls();

  const sequence = async () => {
    const startX = albumsNumber * 10;
    const startY = 100 - albumsNumber * 10;
    await controls.start(i => ({
      x: `-${startX}%`,
      y: `-${startY}%`,
      transition: { delay: i * 0.1, ease: 'anticipate', duration: 1.5 }
    }));
    await controls.start(i => ({
      x: `-${startX + i * 10}%`,
      y: `-${startY - i * 10}%`,
      transition: { ease: 'anticipate', duration: 0.6 }
    }));
  };
  useEffect(() => {
    sequence();
  });

  return (
    <div className="flex items-center justify-center py-10 flex-wrap gap-x-10 overflow-hidden">
      <div className="max-w-[500px]">
        <h2>Create your own albums.</h2>
        <p className="text-xl">
          After creating your account, you can save images in albums which you
          can check later.
        </p>
      </div>
      <div className="relative h-[400px] w-[500px]">
        {albumsSectionImages.map((imageUrl, index) => {
          return (
            <motion.div
              key={index}
              custom={index}
              animate={controls}
              className="album-example"
              style={{
                zIndex: index,
                x: '100vw',
                y: '-60%'
              }}
            >
              <Image
                src={`${imageUrl}?auto=compress&cs=tinysrgb&w=480`}
                alt={'album-' + index}
                className="w-full rounded-inherit"
                fill
              />
              <span className="absolute bottom-3 left-4 opacity-70 font-bold">
                album
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
