import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { getImageFetchURL } from '@/utils';
import { router, publicProcedure } from '../trpc';
import { ImageAPIRequestQuerySchema } from '@/types/zod';
import { ResponseImageSchema, ImagePageSchema } from '@/types/zod';

type ImagePage = z.infer<typeof ImagePageSchema>;
type ResponseImage = z.infer<typeof ResponseImageSchema>;

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
  signal: z.custom<AbortSignal>().optional()
});
const fetchPhotoOutputSchema = z.object({
  image: ResponseImageSchema,
  alt: z.string().optional()
});

export const ImageRouter = router({
  // fetch an image page
  fetchImages: publicProcedure
    .input(fetchImagesInputSchema)
    .output(ImagePageSchema)
    .query(async ({ input }) => {
      try {
        const { params, signal } = input;
        const res = await fetch(getImageFetchURL(params), { signal });
        const data = await res.json();

        const images: ResponseImage[] = data.photos.map(extractImageObject);
        return { images, hasMore: 'next_page' in data };
      } catch (error) {
        throw new TRPCError({ code: 'UNPROCESSABLE_CONTENT', cause: error });
        // return { images: [], hasMore: false, error };
      }
    }),
  // fetch one image with ID
  fetchPhoto: publicProcedure
    .input(z.number())
    .output(fetchPhotoOutputSchema)
    .query(async ({ input: id }) => {
      try {
        const requestQuery = { endpoint: '/photos/' + id };

        const response = await fetch(getImageFetchURL(requestQuery));
        const data = await response.json();

        return { image: extractImageObject(data), alt: data.alt };
      } catch (error) {
        throw new TRPCError({ code: 'NOT_FOUND', cause: error });
        // return { image: null, alt: '', error };
      }
    })
});
