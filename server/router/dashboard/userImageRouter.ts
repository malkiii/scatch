import { z } from 'zod';
import { db } from '@/server/db/client';
import { router, publicProcedure } from '@/server/trpc';
import { ResponseImageSchema } from '@/utils/validation';

const images = db.image;

const ImageSchema = ResponseImageSchema.merge(
  z.object({
    userId: z.string(),
    albumName: z.string()
  })
);

const IdUserIdSchema = z.object({
  id: z.number(),
  userId: z.string()
});

export const userImageRouter = router({
  addNewImage: publicProcedure.input(ImageSchema).mutation(async ({ input }) => {
    const { userId, albumName, photographer, ...image } = input;
    return await images.create({
      data: {
        ...image,
        user: { connect: { id: userId } },
        album: { connect: { name_userId: { name: albumName, userId } } }
      },
      include: { album: true }
    });
  }),
  deleteImage: publicProcedure.input(IdUserIdSchema).mutation(async ({ input: id_userId }) => {
    return await images.delete({ where: { id_userId } });
  }),
  getAllImages: publicProcedure.input(z.string()).query(async ({ input: userId }) => {
    return await images.findMany({ where: { userId } });
  }),
  setFavoriteImage: publicProcedure.input(IdUserIdSchema).mutation(async ({ input: id_userId }) => {
    return await images.update({ where: { id_userId }, data: { isFavorite: true } });
  }),
  getAllFavoriteImages: publicProcedure.input(z.string()).query(async ({ input: userId }) => {
    return await images.findMany({ where: { userId, isFavorite: true } });
  })
});
