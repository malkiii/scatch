import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ModalActions } from '@/types';
import { getImageModalRouteQuery } from '@/utils';

type ModalImage = {
  id: number;
};

enum SwitchDirection {
  next = 1,
  prev = -1
}
type SwitchOption = keyof typeof SwitchDirection;

function disableScrolling(ok: boolean) {
  const bodyClasses = document.body.classList;
  if (ok) bodyClasses.add('scrolling-disabled');
  else bodyClasses.remove('scrolling-disabled');
}

export const useModalRoute = (array: ModalImage[], pagePath: string) => {
  const router = useRouter();
  const { pathname } = router;
  const imagesNumber = array.length;
  const modalIndex = router.query.i ? Number(router.query.i) : null;

  function switchTo(option: SwitchOption) {
    const imageIndex = Number(router.query.i) + SwitchDirection[option];
    const inRange = imageIndex >= 0 && imageIndex < imagesNumber;
    if (!inRange) return;

    showImageModal(imageIndex);
  }

  function showImageModal(imageIndex: number) {
    const id = array[imageIndex].id;
    const as = `/image/${id}`;
    const query = getImageModalRouteQuery(pathname, id, imageIndex);
    const href = { pathname, query };

    router.push(href, as, { shallow: true });
  }

  function closeModal() {
    router.push(pagePath, undefined, { shallow: true });
  }

  const onFirstImage = !modalIndex;
  const onLastImage = modalIndex == null || modalIndex == imagesNumber - 1;

  const modalActions: ModalActions = {
    next: onLastImage ? undefined : () => switchTo('next'),
    prev: onFirstImage ? undefined : () => switchTo('prev'),
    close: closeModal
  };

  useEffect(() => {
    disableScrolling(modalIndex != null);
  }, [modalIndex]);

  return { modalIndex, modalActions };
};
