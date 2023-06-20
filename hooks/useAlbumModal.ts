import { ResponseImage } from '@/types';
import { useState } from 'react';

function disableScrolling(ok: boolean) {
  const bodyClasses = document.body.classList;
  if (ok) bodyClasses.add('scrolling-disabled');
  else bodyClasses.remove('scrolling-disabled');
}

export const useAlbumModal = (image: ResponseImage, userId: string) => {
  const [showAlbumModal, setShowAlbumModal] = useState<boolean>(false);
  const albumModalProps = { image, userId };

  function toggleAlbumModal() {
    disableScrolling(!showAlbumModal);
    setShowAlbumModal(!showAlbumModal);
  }

  return { showAlbumModal, albumModalProps, toggleAlbumModal };
};
