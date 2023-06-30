import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { ImageAPIRequestQuery } from '@/types';
import {
  ImageAPIRequestQuerySchema,
  ImagePageSchema,
  ResponseImageSchema
} from '@/utils/validation';
import { publicProcedure, router } from '../trpc';

export function getImageFetchURL(requestQuery: ImageAPIRequestQuery): URL {
  const { API_ENDPOINT } = process.env;
  const { endpoint, query, orientation, page, per_page } = requestQuery;

  const endpointName = '/v1' + endpoint;
  const endpointURL = new URL(endpointName, API_ENDPOINT);
  if (endpointName.includes('/photos')) return endpointURL;

  endpointURL.searchParams.set('page', (page || 1).toString());
  endpointURL.searchParams.set('per_page', (per_page || 24).toString());

  if (query && endpointName.includes('/search')) endpointURL.searchParams.set('query', query);
  if (orientation && orientation != 'all') endpointURL.searchParams.set('orientation', orientation);

  return endpointURL;
}

type ImagePage = z.infer<typeof ImagePageSchema>;
type ResponseImage = z.infer<typeof ResponseImageSchema>;

const requestInit = {
  method: 'GET',
  headers: { Authorization: process.env.API_KEY as string }
};

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

const fetchImagesInputSchema = z.object({
  params: ImageAPIRequestQuerySchema,
  // we have to add `cursor` to use the useInfinitQuery hook
  cursor: z.number().nullish().optional()
});
const fetchPhotoOutputSchema = z.object({
  image: ResponseImageSchema,
  alt: z.string()
});

export const imageRouter = router({
  // fetch an image page
  fetchImages: publicProcedure
    .input(fetchImagesInputSchema)
    .output(ImagePageSchema)
    .query(async ({ input }) => {
      try {
        const { params, cursor: page } = input;
        const res = await fetch(getImageFetchURL({ ...params, page }), requestInit);
        const data = await res.json();

        const images: ResponseImage[] = data.photos.map(extractImageObject);
        return { images, hasMore: 'next_page' in data };
      } catch (error) {
        throw new TRPCError({ code: 'UNPROCESSABLE_CONTENT', cause: error });
      }
    }),
  // fetch one image with ID
  fetchPhoto: publicProcedure
    .input(z.number())
    .output(fetchPhotoOutputSchema)
    .query(async ({ input: id }) => {
      try {
        const requestQuery = { endpoint: '/photos/' + id };

        const response = await fetch(getImageFetchURL(requestQuery), requestInit);
        const data = await response.json();

        return { image: extractImageObject(data), alt: data.alt || '' };
      } catch (error) {
        throw new TRPCError({ code: 'NOT_FOUND', cause: error });
      }
    })
});
