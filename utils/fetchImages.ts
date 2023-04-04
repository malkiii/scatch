import { ResponseImage } from '../hooks/useFetch';

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
