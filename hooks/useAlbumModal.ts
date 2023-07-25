import { useState } from 'react';
import { ResponseImage } from '@/types';
import { disableScrolling } from '@/utils';

export const useAlbumModal = (image: ResponseImage, userId: string) => {
  const [showAlbumModal, setShowAlbumModal] = useState<boolean>(false);
  const albumModalProps = { image, userId };

  function toggleAlbumModal() {
    disableScrolling(!showAlbumModal);
    setShowAlbumModal(!showAlbumModal);
  }

  return { showAlbumModal, albumModalProps, toggleAlbumModal };
};
