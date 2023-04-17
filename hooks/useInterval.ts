import { useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

type IndexState = [number, Dispatch<SetStateAction<number>>];
type IntervalHook = (itemsNumber: number, delay: number) => IndexState;

export const useInterval: IntervalHook = (itemsNumber, delay) => {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    if (currentIndex == -1) return;
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex == itemsNumber - 1 ? 0 : currentIndex + 1);
    }, delay);
    return () => {
      clearInterval(interval);
    };
  });

  return [currentIndex, setCurrentIndex];
};
