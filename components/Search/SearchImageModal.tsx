import ImageModal from '../ImageModal';
import { ResponseImage } from '@utils/types';
import { FC, useRef } from 'react';
import { useModalRoute } from '@hooks/useModalRoute';
import { DownloadButton, PhotographerName, SaveButton } from './ImageLayer';
import { useBlurhashImage } from '@hooks/useBlurhashImage';

type ImageNavProps = {
  image: ResponseImage;
  onClick?: () => void;
};

const ImageNavbar: FC<ImageNavProps> = ({ image, onClick }) => {
  return (
    <div className="flex items-center justify-between pb-5" onClick={onClick}>
      <PhotographerName name={image.photographer} />
      <div className="flex items-center gap-3">
        <SaveButton />
        <DownloadButton image={image} content="text" />
      </div>
    </div>
  );
};

type ModalProps = {
  images: ResponseImage[];
  pagePath: string;
};

const SearchImageModal: FC<ModalProps> = props => {
  const { images, pagePath } = props;
  const { modalIndex, modalActions } = useModalRoute(images, pagePath);
  if (modalIndex == null) return <></>;

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const currentImage = images[modalIndex];
  const { src } = currentImage;

  useBlurhashImage(imageContainerRef, src);

  return (
    <ImageModal
      key={modalIndex}
      image={currentImage}
      containerRef={imageContainerRef}
      actions={modalActions}
    >
      <ImageNavbar image={currentImage} onClick={modalActions.close} />
    </ImageModal>
  );
};
export default SearchImageModal;
