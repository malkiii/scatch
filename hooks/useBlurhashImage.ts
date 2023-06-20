import { useEffect } from 'react';
import { ContainerRef } from '@/types';
import { getResizedImage } from '@/utils';
import getBlurhash from '@/utils/blurhash';

export const useBlurhashImage = (containerRef: ContainerRef, src: string) => {
  const preloadBlurhashImage = async () => {
    const blurhash = await getBlurhash(getResizedImage(src, 4));
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
