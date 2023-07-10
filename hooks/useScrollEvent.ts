import { useEffect, useState } from 'react';

export const useScrollEvent = <T extends (...args: any[]) => any>(callback: T): ReturnType<T> => {
  const [callbackResult, setCallbackResult] = useState<ReturnType<T>>();

  function handleScrolling() {
    setCallbackResult(callback());
  }

  useEffect(() => {
    handleScrolling();
    window.addEventListener('scroll', handleScrolling);
    return () => {
      window.removeEventListener('scroll', handleScrolling);
    };
  });

  return callbackResult!;
};
