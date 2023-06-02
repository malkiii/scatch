import { z } from 'zod';

export const ImageAPIRequestQuerySchema = z.object({
  endpoint: z.string().startsWith('/'),
  query: z.string().optional(),
  orientation: z
    .union([z.literal('all'), z.literal('landscape'), z.literal('portrait')])
    .optional(),
  page: z.number().optional(),
  per_page: z.number().optional()
});

export const ResponseImageSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  photographer: z.string(),
  avgColor: z.string().startsWith('#'),
  src: z.string().url()
});

export const ImagePageSchema = z.object({
  images: z.array(ResponseImageSchema),
  hasMore: z.boolean()
});
