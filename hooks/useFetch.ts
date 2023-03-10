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
  try {
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
    return { newImages, inLastPage: !('next_page' in data) };
  } catch (err) {
    return { newImages: [], inLastPage: true };
  }
};

export const useFetch = (
  endpoint: string,
  currentPage: number,
  query = '',
  array: ResponseImage[] = []
): ResponseImage[] => {
  const [imageArray, setImageArray] = useState(array);
  const [nextPage, setNextPage] = useState(currentPage + 1);

  const appendNewImages = async () => {
    if (nextPage == 0) return;
    const params = new URLSearchParams({
      p: nextPage.toString(),
      e: endpoint,
      q: query
    });
    const { newImages, inLastPage } = await fetchImages(params);
    setImageArray([...imageArray, ...newImages]);
    setNextPage(inLastPage ? 0 : nextPage + 1);
  };

  // useEffect(() => {
  //   if (array.length == 0) appendNewImages();
  // }, []);

  return imageArray;
};
