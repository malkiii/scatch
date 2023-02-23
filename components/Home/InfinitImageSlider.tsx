import Image from 'next/image';
import { heroSectionImages } from '../../constants';
import { motion } from 'framer-motion';

export default function InfinitImageSlider(): JSX.Element {
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
