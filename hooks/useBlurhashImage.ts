import { useEffect } from 'react';
import getBlurhash from '@utils/blurhash';
import { ContainerRef } from '@utils/types';

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
