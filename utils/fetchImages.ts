import { HOSTNAME } from '@data/constants';
import { ResponseImage } from '@utils/types';

type ResponseData = {
  images: ResponseImage[];
  hasMore: boolean;
};

const API_TOKEN = process.env.API_TOKEN as string;
const headers = { token: API_TOKEN };

function extractImageObject(data: Record<string, any>): ResponseImage {
  return {
    id: data.id,
    width: data.width,
    height: data.height,
    photographer: data.photographer,
    avgColor: data.avg_color,
    src: data.src.original
  };
}

export const fetchImages = async (
  params: Record<string, string>,
  signal?: AbortSignal
): Promise<ResponseData> => {
  try {
    const endpointURL = new URL('/api/images', HOSTNAME);
    endpointURL.search = new URLSearchParams(params).toString();

    const response = await fetch(endpointURL, { headers, signal });
    const data = await response.json();

    const images: ResponseImage[] = data.photos.map((image: any) =>
      extractImageObject(image)
    );

    return { images, hasMore: 'next_page' in data };
  } catch (error) {
    return { images: [], hasMore: false };
  }
};

export const fetchPhoto = async (id: string) => {
  try {
    const endpointURL = new URL('/api/images', HOSTNAME);
    endpointURL.searchParams.set('e', '/photos/' + id);

    const response = await fetch(endpointURL, { headers });
    const data = await response.json();

    const image = extractImageObject(data);

    return { image, alt: data.alt };
  } catch (error) {
    return { image: null, alt: '' };
  }
};
