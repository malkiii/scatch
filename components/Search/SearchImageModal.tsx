import { FC } from 'react';
import ImageModal from '../ImageModal';
import { ResponseImage, ModalActions } from '@/types';
import { DownloadButton, PhotographerName, SaveButton } from './ImageLayer';

type ImageNavProps = {
  image: ResponseImage;
  onClick?: () => void;
};

const ImageNavbar: FC<ImageNavProps> = ({ image, onClick }) => {
  return (
    <div className="flex items-center justify-between pb-5" onClick={onClick}>
      <PhotographerName name={image.photographer} className="text-white" />
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
  return (
    <ImageModal key={index} image={image} actions={modalActions}>
      <ImageNavbar image={image} onClick={modalActions.close} />
    </ImageModal>
  );
};
export default SearchImageModal;
