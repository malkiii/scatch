import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type IndexState = [number, Dispatch<SetStateAction<number>>, number];
type IntervalHook = (itemsNumber: number, delay: number) => IndexState;

export const useInterval: IntervalHook = (itemsNumber, delay) => {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [loopsCounter, setLoopsCounter] = useState<number>(-1);

  useEffect(() => {
    if (currentIndex == -1) return;
    if (currentIndex == 0) setLoopsCounter(loopsCounter + 1);
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex == itemsNumber - 1 ? 0 : currentIndex + 1);
    }, delay);
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return [currentIndex, setCurrentIndex, loopsCounter];
};
