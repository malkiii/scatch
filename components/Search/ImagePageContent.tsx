import Image from 'next/image';
import { FC, useRef } from 'react';
import { ResponseImage } from '@/utils/types';
import { useBlurhashImage } from '@/hooks/useBlurhashImage';
import {
  SaveButton,
  DownloadButton,
  PhotographerName
} from '@/components/Search/ImageLayer';

const ImageNavbar: FC<{ image: ResponseImage }> = ({ image }) => {
  return (
    <div className="flex items-center justify-between pb-5">
      <PhotographerName
        name={image.photographer}
        className="text-2xl font-bold text-dark dark:text-white"
      />
      <div className="flex items-center gap-3">
        <SaveButton className="cs-change" />
        <DownloadButton image={image} content="text" className="cs-change" />
      </div>
    </div>
  );
};

type PageContentProps = {
  image: ResponseImage;
  alt: string;
};

const RenderedImage: FC<PageContentProps> = ({ image, alt }) => {
  const { width, height, src } = image;
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useBlurhashImage(imageContainerRef, src);

  const containerClassName =
    'mx-auto w-full ' + (height > width ? 'md:w-1/2' : '');

  return (
    <div ref={imageContainerRef} className={containerClassName}>
      <Image
        src={src}
        width={width}
        height={height}
        className="bg-image"
        alt={'scatch ' + alt}
      />
    </div>
  );
};

const ImagePageContent: FC<PageContentProps> = props => {
  return (
    <>
      <ImageNavbar image={props.image} />
      <RenderedImage {...props} />
    </>
  );
};

export default ImagePageContent;
