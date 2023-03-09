import { useState, useEffect } from 'react';

export type ResponseImage = {
  id: number;
  width: number;
  height: number;
  photographer: string;
  avgColor: string;
  src: string;
};

export const fetchImages = async (params: URLSearchParams) => {
  const response = await fetch(`http://localhost:3000/api/images?${params}`);
  const data = await response.json();
  const newImages: ResponseImage[] = data.photos.map((image: any) => ({
    id: image.id,
    width: image.width,
    height: image.height,
    photographer: image.photographer,
    avgColor: image.avg_color,
    src: image.src.original
  }));
  return newImages;
};

export const useFetch = (
  endpoint: string,
  query = '',
  array: ResponseImage[] = []
): ResponseImage[] => {
  const [imageArray, setImageArray] = useState(array);
  const [currentPage, setCurrentPage] = useState(1);

  const appendNewImages = async () => {
    const params = new URLSearchParams({
      p: currentPage.toString(),
      e: endpoint,
      q: query
    });
    const newImages = await fetchImages(params);
    setImageArray([...imageArray, ...newImages]);
  };

  useEffect(() => {
    if (array.length == 0) appendNewImages();
  }, [imageArray]);

  return imageArray;
};
