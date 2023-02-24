import Image from 'next/image';
import { motion } from 'framer-motion';

export const heroSectionImages = [
  {
    url: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    position: 'top-16 -right-10'
  },
  {
    url: 'https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg',
    position: '-top-10 -left-5'
  },
  {
    url: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg',
    position: '-bottom-5 left-20'
  }
];

export default function ImageContainer(): JSX.Element {
  return (
    <div className="relative w-[560px] h-[500px] border-theme border-2">
      {heroSectionImages.map((image, index) => (
        <motion.div
          key={index}
          initial={{ x: 100 + 'vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', duration: 0.5, delay: index * 0.2 }}
          className={'hero-section-image ' + image.position}
        >
          <Image
            src={image.url + '?auto=compress&cs=tinysrgb&w=1280'}
            alt={'image-' + index}
            fill
          />
        </motion.div>
      ))}
    </div>
  );
}
