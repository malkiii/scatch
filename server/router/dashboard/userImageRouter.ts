import { z } from 'zod';
import { db } from '@/server/db/client';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure } from '@/server/trpc';
import { ResponseImageSchema } from '@/utils/validation';

const images = db.image;

const ImageSchema = z.object({
  userId: z.string(),
  albumName: z.string(),
  image: ResponseImageSchema
});

const IdUserIdSchema = z.object({
  id: z.number(),
  userId: z.string()
});

export const userImageRouter = router({
  addNewImage: publicProcedure.input(ImageSchema).mutation(async ({ input }) => {
    const { userId, albumName, image } = input;
    const { photographer, ...userImage } = image;
    try {
      return await images.create({
        data: {
          ...userImage,
          user: { connect: { id: userId } },
          album: { connect: { name_userId: { name: albumName, userId } } }
        },
        include: { album: true }
      });
    } catch (error) {
      return { error };
    }
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
