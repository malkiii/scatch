import { siteInfos } from '@/data/constants';
import { ImagePage, ResponseImage } from '@/types';

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

type fetchImagesData = ImagePage & {
  error?: any;
};

export const fetchImages = async (
  params: Record<string, string>,
  signal?: AbortSignal
): Promise<fetchImagesData> => {
  try {
    const endpointURL = new URL('/api/images', siteInfos.url);
    endpointURL.search = new URLSearchParams(params).toString();

    const response = await fetch(endpointURL, { headers, signal });
    const data = await response.json();

    const images: ResponseImage[] = data.photos.map((image: any) => extractImageObject(image));

    return { images, hasMore: 'next_page' in data };
  } catch (error) {
    return { images: [], hasMore: false, error };
  }
};

type fetchPhotoData = {
  image: ResponseImage | null;
  alt: string;
  error?: any;
};

export const fetchPhoto = async (id: string): Promise<fetchPhotoData> => {
  try {
    const endpointURL = new URL('/api/images', siteInfos.url);
    endpointURL.searchParams.set('e', '/photos/' + id);

    const response = await fetch(endpointURL, { headers });
    const data = await response.json();

    const image = extractImageObject(data);

    return { image, alt: data.alt };
  } catch (error) {
    return { image: null, alt: '', error };
  }
};
