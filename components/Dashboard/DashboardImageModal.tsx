import { FC } from 'react';
import { Image as UserImage } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { ModalActions } from '@/types';
import { DownloadButton, FavoriteButton, ImageTitle } from '../ImageLayer';
import ImageModal from '../ImageModal';

type ImageNavProps = {
  image: UserImage;
  onClick?: () => void;
};
const ImageNavbar: FC<ImageNavProps> = ({ image, onClick }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const albumModalProps = { userId, image };
  return (
    <div className="flex items-center justify-between pb-5" onClick={onClick}>
      <ImageTitle title={image.albumName} className="text-white" />
      <div className="flex items-center gap-3">
        <FavoriteButton {...albumModalProps} className="cs-fixed" />
        <DownloadButton {...albumModalProps} content="text" className="cs-fixed" />
      </div>
    </div>
  );
};

type ModalProps = {
  index: number;
  image: UserImage;
  modalActions: ModalActions;
};
const DashboardImageModal: FC<ModalProps> = ({ index, image, modalActions }) => {
  return (
    <ImageModal key={index} image={image} actions={modalActions}>
      <ImageNavbar image={image} onClick={modalActions.close} />
    </ImageModal>
  );
};
export default DashboardImageModal;
