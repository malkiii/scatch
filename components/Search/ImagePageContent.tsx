import { cn } from '@/utils';
import Image from 'next/image';
import { FC, useRef } from 'react';
import { ResponseImage } from '@/types';
import { useSession } from 'next-auth/react';
import { useAlbumModal } from '@/hooks/useAlbumModal';
import AlbumModal from '@/components/Dashboard/AlbumModal';
import { useBlurhashImage } from '@/hooks/useBlurhashImage';
import { SaveButton, DownloadButton, ImageTitle } from '@/components/ImageLayer';

const ImageNavbar: FC<{ image: ResponseImage }> = ({ image }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const { showAlbumModal, albumModalProps, toggleAlbumModal } = useAlbumModal(image, userId!);
  return (
    <AlbumModal show={showAlbumModal} toggle={toggleAlbumModal} {...albumModalProps}>
      <div className="flex items-center justify-between pb-5">
        <ImageTitle
          title={image.photographer}
          className="text-2xl font-bold text-dark dark:text-white"
        />
        <div className="flex items-center gap-3">
          <SaveButton
            {...albumModalProps}
            toggleAlbumModal={toggleAlbumModal}
            className="cs-change"
          />
          <DownloadButton {...albumModalProps} content="text" className="cs-change" />
        </div>
      </div>
    </AlbumModal>
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

  return (
    <div ref={imageContainerRef} className={cn('mx-auto w-full', { 'md:w-1/2': height > width })}>
      <Image src={src} width={width} height={height} className="bg-image" alt={'scatch ' + alt} />
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
