import Image from 'next/image';
import { motion } from 'framer-motion';
import { albumsSectionImages } from '../../constants';
import ThemeButton from '../ThemeButton';

const albumsNumber = albumsSectionImages.length;

export default function AlbumsSection() {
  return (
    <div className="flex items-center justify-center py-16 gap-x-10 overflow-hidden">
      <div className="max-w-[500px]">
        <h2>Create your own albums.</h2>
        <p className="text-xl mb-6">
          After creating your account, you can save images in albums which you
          can check later.
        </p>
        <ThemeButton text="See your albums" />
      </div>
      <div className="relative h-[400px] w-[500px]">
        {albumsSectionImages.map((imageUrl, index) => {
          const startX = albumsNumber * 10;
          const startY = 100 - albumsNumber * 10;
          return (
            <motion.div
              key={index}
              className="album-example"
              style={{
                zIndex: index,
                x: '-50%',
                y: `-${startY - index * 10}%`
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
