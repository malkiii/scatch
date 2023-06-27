import { db } from '@/server/db/client';
import { publicProcedure, router } from '@/server/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { ResponseImageSchema, UserInfinitQuerySchema } from '@/utils/validation';

const images = db.image;
const perPage = 24;

const ImageSchema = z.object({
  userId: z.string(),
  albumName: z.string(),
  image: ResponseImageSchema
});

const IdUserIdSchema = z.object({
  id: z.number(),
  userId: z.string()
});

const FavoriteImageSchema = IdUserIdSchema.merge(
  z.object({
    isFavorite: z.boolean()
  })
);

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
  getAllImages: publicProcedure.input(UserInfinitQuerySchema).query(async ({ input }) => {
    const { userId, cursor: page } = input;

    const data = await images.findMany({
      skip: (page! - 1) * perPage,
      take: perPage + 1,
      where: { userId }
    });

    const hasMore = data.length > perPage;
    if (hasMore) data.pop();
    return { data, hasMore };
  }),
  setFavoriteImage: publicProcedure.input(FavoriteImageSchema).mutation(async ({ input }) => {
    const { isFavorite, ...id_userId } = input;
    return await images.update({ where: { id_userId }, data: { isFavorite } });
  }),
  getAllFavoriteImages: publicProcedure.input(UserInfinitQuerySchema).query(async ({ input }) => {
    const { userId, cursor: page } = input;

    const data = await images.findMany({
      skip: (page! - 1) * perPage,
      take: perPage + 1,
      where: { userId, isFavorite: true }
    });

    const hasMore = data.length > perPage;
    if (hasMore) data.pop();
    return { data, hasMore };
  })
});
