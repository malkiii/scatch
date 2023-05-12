import { FC, useRef } from 'react';
import ImageModal from '../ImageModal';
import { ModalActions } from '@/types';
import { ResponseImage } from '@/types';
import { useBlurhashImage } from '@/hooks/useBlurhashImage';
import { DownloadButton, PhotographerName, SaveButton } from './ImageLayer';

type ImageNavProps = {
  image: ResponseImage;
  onClick?: () => void;
};

const ImageNavbar: FC<ImageNavProps> = ({ image, onClick }) => {
  return (
    <div className="flex items-center justify-between pb-5" onClick={onClick}>
      <PhotographerName name={image.photographer} />
      <div className="flex items-center gap-3">
        <SaveButton className="cs-fixed" />
        <DownloadButton image={image} content="text" className="cs-fixed" />
      </div>
    </div>
  );
};

type ModalProps = {
  index: number;
  image: ResponseImage;
  modalActions: ModalActions;
};

const SearchImageModal: FC<ModalProps> = ({ index, image, modalActions }) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  useBlurhashImage(imageContainerRef, image.src);

  return (
    <ImageModal
      key={index}
      image={image}
      containerRef={imageContainerRef}
      actions={modalActions}
    >
      <ImageNavbar image={image} onClick={modalActions.close} />
    </ImageModal>
  );
};
export default SearchImageModal;
