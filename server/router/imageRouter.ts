import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { getImageFetchURL } from '@/utils';
import { router, publicProcedure } from '../trpc';
import {
  ResponseImageSchema,
  ImageAPIRequestQuerySchema,
  ImagePageSchema
} from '@/utils/validation';

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
  signal: z.custom<AbortSignal>().optional(),
  // we have to add `cursor` to use the useInfinitQuery hook
  cursor: z.number().nullish().optional()
});
const fetchPhotoOutputSchema = z.object({
  image: ResponseImageSchema,
  alt: z.string()
});

export const ImageRouter = router({
  // fetch an image page
  fetchImages: publicProcedure
    .input(fetchImagesInputSchema)
    .output(ImagePageSchema)
    .query(async ({ input }) => {
      try {
        const { params, signal, cursor: page } = input;
        const res = await fetch(getImageFetchURL({ ...params, page }), { ...requestInit, signal });
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
