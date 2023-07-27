import { FC } from 'react';
import { useSession } from 'next-auth/react';
import { ModalActions, ResponseImage } from '@/types';
import { useAlbumModal } from '@/hooks/useAlbumModal';
import AlbumModal from '@/components/Dashboard/AlbumModal';
import { DownloadButton, ImageTitle, SaveButton } from '../ImageLayers';
import ImageModal from '../ImageModal';

type ModalProps = {
  index: number;
  image: ResponseImage;
  modalActions: ModalActions;
};
const SearchImageModal: FC<ModalProps> = ({ index, image, modalActions }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const { showAlbumModal, albumModalProps, toggleAlbumModal } = useAlbumModal(image, userId!);

  return (
    <ImageModal key={index} image={image} actions={modalActions}>
      <AlbumModal show={showAlbumModal} toggle={toggleAlbumModal} {...albumModalProps}>
        <div className="flex items-center justify-between pb-5" onClick={modalActions.close}>
          <ImageTitle title={image.photographer} className="text-white" />
          <div className="flex items-center gap-3">
            <SaveButton {...albumModalProps} toggleAlbumModal={toggleAlbumModal} />
            <DownloadButton content="text" {...albumModalProps} />
          </div>
        </div>
      </AlbumModal>
    </ImageModal>
  );
};

export default SearchImageModal;
