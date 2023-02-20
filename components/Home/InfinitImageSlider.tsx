import Image from 'next/image';
import { sliderImages } from '../../constants';
import { motion } from 'framer-motion';

type ImageRowProps = {
  row: 1 | 2;
};

function changeCoverPosition(e: any) {
  const image = e.currentTarget as HTMLAnchorElement;
  image.classList.toggle('after:left-0');
  image.classList.toggle('after:right-0');
}

function ImageRow({ row }: ImageRowProps): JSX.Element {
  const start = row == 1 ? 0 : sliderImages.length / 2;
  return (
    <Duplicate row={row}>
      {new Array(sliderImages.length / 2).fill(null).map((_, id) => (
        <div
          key={id + start}
          className="slider-image after:right-0"
          onMouseEnter={changeCoverPosition}
          onMouseLeave={changeCoverPosition}
        >
          <Image
            src={sliderImages[id + start]}
            alt={'image-' + (id + start)}
            className="w-full"
            width={1920}
            height={1080}
          />
        </div>
      ))}
    </Duplicate>
  );
}

const Duplicate = ({ children, ...props }: any) => {
  const isFirstRow = props.row == 1;
  return (
    <motion.div
      initial={{ x: isFirstRow ? '0' : '-50%' }}
      animate={{ x: isFirstRow ? '-50%' : '0' }}
      transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
      className={
        'absolute flex gap-x-4 pr-4 ' + (isFirstRow ? 'top-0' : 'bottom-0')
      }
    >
      {children}
      {children}
    </motion.div>
  );
};

export default function InfinitImageSlider(): JSX.Element {
  return (
    <div className="relative w-full aspect-[1536/525] overflow-hidden">
      <ImageRow row={1} />
      <ImageRow row={2} />
    </div>
  );
}
