import { useRouter } from 'next/router';

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
  const classNames = ['pr-4', 'overflow-y-hidden'];

  classNames.forEach(className => {
    if (ok) bodyClasses.add(className);
    else bodyClasses.remove(className);
  });
}

export const useModalRoute = (array: ModalImage[], pagePath: string) => {
  const router = useRouter();
  const { pathname } = router;
  const imagesNumber = array.length;
  const modalIndex = router.query.i ? Number(router.query.i) : null;

  disableScrolling(modalIndex != null);

  function switchTo(option: SwitchOption) {
    const imageIndex = Number(router.query.i) + SwitchDirection[option];
    const inRange = imageIndex >= 0 && imageIndex < imagesNumber;
    if (!inRange) return;

    showImageModal(imageIndex);
  }

  function showImageModal(imageIndex: number) {
    const id = array[imageIndex].id;
    const as = `/image/${id}`;
    const href = {
      pathname,
      query: { query: id, i: imageIndex }
    };

    router.push(href, as, { shallow: true });
  }

  function closeModal() {
    router.push(pagePath, undefined, { shallow: true });
  }

  const onFirstImage = !modalIndex;
  const onLastImage = modalIndex == null || modalIndex == imagesNumber - 1;

  const modalActions = {
    next: onLastImage ? undefined : () => switchTo('next'),
    prev: onFirstImage ? undefined : () => switchTo('prev'),
    close: closeModal
  };

  return { modalIndex, modalActions };
};
