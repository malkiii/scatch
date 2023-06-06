import { useEffect, useState } from 'react';

export const useScrollingEvent = (shouldScroll: () => boolean) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  function handleScrolling() {
    setIsScrolling(shouldScroll());
  }

  useEffect(() => {
    handleScrolling();
    window.addEventListener('scroll', handleScrolling);
    return () => {
      window.removeEventListener('scroll', handleScrolling);
    };
  });

  return isScrolling;
};
