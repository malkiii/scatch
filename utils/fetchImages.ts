import { ResponseImage } from '../hooks/useInfinitScroll';

type ResponseData = {
  images: ResponseImage[];
  hasMore: boolean;
};

export const fetchImages = async (
  params: Record<string, string>,
  signal?: AbortSignal
): Promise<ResponseData> => {
  try {
    const PARAMS = new URLSearchParams(params);
    const ENDPOINT = 'http://localhost:3000/api/images?' + PARAMS;

    const API_TOKEN = process.env.API_TOKEN as string;
    const headers = { token: API_TOKEN };

    const response = await fetch(ENDPOINT, { headers, signal });
    const data = await response.json();

    const images: ResponseImage[] = data.photos.map((image: any) => ({
      id: image.id,
      width: image.width,
      height: image.height,
      photographer: image.photographer,
      avgColor: image.avg_color,
      src: image.src.original
    }));

    return { images, hasMore: 'next_page' in data };
  } catch (error) {
    return { images: [], hasMore: false };
  }
};
