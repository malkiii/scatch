import { FC } from 'react';
import { Image as UserImage } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { ModalActions } from '@/types';
import { DeleteButton, DownloadButton, FavoriteButton, ImageTitle } from '../ImageLayers';
import ImageModal from '../ImageModal';

type ModalProps = {
  index: number;
  image: UserImage;
  modalActions: ModalActions;
};
const DashboardImageModal: FC<ModalProps> = ({ index, image, modalActions }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const albumModalProps = { userId, image };

  return (
    <ImageModal key={index} image={image} actions={modalActions}>
      <div className="flex items-center justify-between pb-5" onClick={modalActions.close}>
        <ImageTitle title={image.albumName} className="text-white" />
        <div className="flex items-center gap-3">
          <FavoriteButton {...albumModalProps} />
          <DownloadButton content="icon" {...albumModalProps} />
          <DeleteButton {...albumModalProps} closeModal={modalActions.close} />
        </div>
      </div>
    </ImageModal>
  );
};

export default DashboardImageModal;
