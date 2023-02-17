import Image from 'next/image';
import { imageSliderUrls } from '../../constants';

type ImageRowProps = {
  row: 1 | 2;
};

function changeCoverPosition(e: any) {
  const image = e.currentTarget as HTMLAnchorElement;
  image.classList.toggle('after:left-0');
  image.classList.toggle('after:right-0');
}

function ImageRow({ row }: ImageRowProps): JSX.Element {
  const start = row == 1 ? 0 : imageSliderUrls.length / 2;
  return (
    <Duplicate row={row}>
      {new Array(imageSliderUrls.length / 2).fill(null).map((_, id) => (
        <div
          key={id + start}
          className="slider-image after:right-0"
          onMouseEnter={changeCoverPosition}
          onMouseLeave={changeCoverPosition}
        >
          <Image
            priority
            src={imageSliderUrls[id + start]}
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
  return (
    <div
      className={
        'absolute flex gap-x-4 pr-4 ' +
        (props.row == 1
          ? 'top-0 animate-scroll-left'
          : 'bottom-0 animate-scroll-right')
      }
    >
      {children}
      {children}
    </div>
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
