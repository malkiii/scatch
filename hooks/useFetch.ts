import { useState, useEffect, useCallback } from 'react';

export type ResponseImage = {
  id: number;
  width: number;
  height: number;
  photographer: string;
  avgColor: string;
  src: string;
};

type FetchConfigs = {
  endpoint: string;
  searchQuery?: string;
  initialImages?: ResponseImage[];
  orientation?: string;
  hasMore: boolean;
};

export const fetchImages = async (params: URLSearchParams) => {
  try {
    const ENDPOINT = 'http://localhost:3000/api/images?' + params;
    const API_TOKEN = process.env.API_TOKEN as string;
    const response = await fetch(ENDPOINT, {
      headers: { token: API_TOKEN }
    });
    const data = await response.json();

    const newImages: ResponseImage[] = data.photos.map((image: any) => ({
      id: image.id,
      width: image.width,
      height: image.height,
      photographer: image.photographer,
      avgColor: image.avg_color,
      src: image.src.original
    }));
    return { newImages, hasMore: 'next_page' in data };
  } catch (err) {
    return { newImages: [], hasMore: false };
  }
};

export const useFetch = (configs: FetchConfigs): ResponseImage[] => {
  const [imageArray, setImageArray] = useState(configs.initialImages || []);
  const [hasMorePages, setHasMorePages] = useState(configs.hasMore);
  const [isCloseToEnd, setIsCloseToEnd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const appendNewImages = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams({
      p: currentPage.toString(),
      e: configs.endpoint,
      q: configs.searchQuery || '',
      o: configs.orientation || 'all'
    });
    const { newImages, hasMore } = await fetchImages(params);

    setImageArray(prevImages => [...prevImages, ...newImages]);
    setHasMorePages(hasMore);
    setIsLoading(false);
  }, [currentPage]);

  const updateImageLayout = () => {
    if (isLoading) return;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;
    const scrollPosition = window.scrollY;
    setIsCloseToEnd(scrollPosition >= fullHeight - windowHeight - 860);
  };

  useEffect(() => {
    if (currentPage > 1) appendNewImages();
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
