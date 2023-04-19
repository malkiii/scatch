import { ResponseImage } from '@/utils/types';
import { fetchImages } from '@/utils/fetchImages';
import { useState, useEffect, useCallback } from 'react';

type FetchConfigs = {
  endpoint: string;
  fetchQuery?: string;
  initialImages?: ResponseImage[];
  orientation?: string;
  hasMore: boolean;
};

/* eslint-disable react-hooks/exhaustive-deps */
export const useInfinitScroll = (configs: FetchConfigs): ResponseImage[] => {
  const [imageArray, setImageArray] = useState(configs.initialImages || []);
  const [hasMorePages, setHasMorePages] = useState(configs.hasMore);
  const [isCloseToEnd, setIsCloseToEnd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const appendNewImages = useCallback(
    async (signal: AbortSignal) => {
      setIsLoading(true);

      const params = {
        p: currentPage.toString(),
        e: configs.endpoint,
        q: configs.fetchQuery || '',
        o: configs.orientation || 'all'
      };
      const { images: newImages, hasMore } = await fetchImages(params, signal);

      setImageArray(prevImages => [...prevImages, ...newImages]);
      setHasMorePages(hasMore);
      setIsLoading(false);
    },
    [currentPage]
  );

  const updateImageLayout = () => {
    if (isLoading) return;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;
    const scrollPosition = window.scrollY;
    setIsCloseToEnd(scrollPosition >= fullHeight - windowHeight - 860);
  };

  useEffect(() => {
    if (currentPage > 1) {
      const controler = new AbortController();
      appendNewImages(controler.signal);
      return () => {
        controler.abort();
      };
    }
  }, [currentPage]);

  useEffect(() => {
    if (isCloseToEnd && hasMorePages) setCurrentPage(currentPage + 1);
  }, [isCloseToEnd]);

  useEffect(() => {
    window.addEventListener('scroll', updateImageLayout);
    return () => {
      window.removeEventListener('scroll', updateImageLayout);
    };
  }, []);

  return imageArray;
};
