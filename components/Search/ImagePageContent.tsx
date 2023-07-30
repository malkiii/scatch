import { FC, useRef } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ResponseImage } from '@/types';
import { cn } from '@/utils';
import { useAlbumModal } from '@/hooks/useAlbumModal';
import { useBlurhashImage } from '@/hooks/useBlurhashImage';
import AlbumModal from '@/components/Dashboard/AlbumModal';
import { DownloadButton, ImageTitle, SaveButton } from '@/components/ImageLayers';

type PageContentProps = {
  image: ResponseImage;
  alt: string;
};
const ImagePageContent: FC<PageContentProps> = ({ image, alt }) => {
  const { data: session } = useSession();
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const userId = session?.user.id;
  const { showAlbumModal, albumModalProps, toggleAlbumModal } = useAlbumModal(image, userId!);
  const { width, height, src } = image;

  useBlurhashImage(imageContainerRef, src);

  return (
    <>
      <AlbumModal show={showAlbumModal} toggle={toggleAlbumModal} {...albumModalProps}>
        <div className="flex items-center justify-between pb-5">
          <ImageTitle title={image.photographer} className="text-2xl font-bold" />
          <div className="flex items-center gap-3">
            <SaveButton {...albumModalProps} toggleAlbumModal={toggleAlbumModal} />
            <DownloadButton {...albumModalProps} content="text" />
          </div>
        </div>
      </AlbumModal>
      <div ref={imageContainerRef} className={cn('mx-auto w-full', { 'md:w-1/2': height > width })}>
        <Image
          src={src}
          width={width}
          height={height}
          className="bg-cover bg-no-repeat"
          alt={'scatch ' + alt}
        />
      </div>
    </>
  );
};

export default ImagePageContent;
