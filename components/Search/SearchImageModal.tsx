import { FC } from 'react';
import { useSession } from 'next-auth/react';
import { ModalActions, ResponseImage } from '@/types';
import { useAlbumModal } from '@/hooks/useAlbumModal';
import AlbumModal from '@/components/Dashboard/AlbumModal';
import { DownloadButton, ImageTitle, SaveButton } from '../ImageLayers';
import ImageModal from '../ImageModal';

type ImageNavProps = {
  image: ResponseImage;
  onClick?: () => void;
};
const ImageNavbar: FC<ImageNavProps> = ({ image, onClick }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const { showAlbumModal, albumModalProps, toggleAlbumModal } = useAlbumModal(image, userId!);

  return (
    <AlbumModal show={showAlbumModal} toggle={toggleAlbumModal} {...albumModalProps}>
      <div className="flex items-center justify-between pb-5" onClick={onClick}>
        <ImageTitle title={image.photographer} className="text-white" />
        <div className="flex items-center gap-3">
          <SaveButton {...albumModalProps} toggleAlbumModal={toggleAlbumModal} />
          <DownloadButton content="text" {...albumModalProps} />
        </div>
      </div>
    </AlbumModal>
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
