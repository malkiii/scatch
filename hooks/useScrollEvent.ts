import { useEffect, useState } from 'react';

export const useScrollEvent = <T extends any>(callback: () => T): T => {
  const [callbackResult, setCallbackResult] = useState<T>();

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
