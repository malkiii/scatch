import { RefObject, useEffect } from 'react';
import getBlurhash from '@utils/blurhash';

type ContainerRef = RefObject<HTMLDivElement>;

export const useBlurhashImage = (containerRef: ContainerRef, src: string) => {
  const preloadImageURL = `${src}?auto=compress&cs=tinysrgb&w=4`;

  const preloadBlurhashImage = async () => {
    const blurhash = await getBlurhash(preloadImageURL);
    const container = containerRef.current;
    if (container) {
      const image = container.firstElementChild as HTMLImageElement;
      image.style.backgroundImage = `url(${blurhash})`;
      image.style.backgroundColor = '#fff';
    }
  };

  useEffect(() => {
    preloadBlurhashImage();
  });
};
