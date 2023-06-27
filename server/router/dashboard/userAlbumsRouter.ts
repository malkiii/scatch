import { db } from '@/server/db/client';
import { publicProcedure, router } from '@/server/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

const albums = db.album;
const perPage = 24;

const AlbumSchema = z.object({
  name: z.string(),
  userId: z.string()
});

const UserAlbumSchema = AlbumSchema.merge(
  z.object({
    cursor: z.number().nullish().optional()
  })
);

const AlbumRenameSchema = AlbumSchema.merge(z.object({ newName: z.string() }));

export const userAlbumRouter = router({
  getAlbumImages: publicProcedure.input(UserAlbumSchema).query(async ({ input }) => {
    const { cursor: page, ...name_userId } = input;

    const data = await albums.findUnique({
      where: { name_userId },
      include: { images: { skip: (page! - 1) * perPage, take: perPage + 1 } }
    });

    const images = data?.images || [];
    const hasMore = images.length > perPage;
    if (hasMore) images.pop();
    return { data: images, hasMore };
  }),
  getAllAlbums: publicProcedure.input(z.string()).query(async ({ input: userId }) => {
    return await albums.findMany({
      where: { userId },
      include: { images: { take: 1, select: { src: true } } }
    });
  }),
  addNewAlbum: publicProcedure.input(AlbumSchema).mutation(async ({ input }) => {
    const { name, userId } = input;
    try {
      return await albums.create({ data: { name, user: { connect: { id: userId } } } });
    } catch (error) {
      throw new TRPCError({ code: 'UNPROCESSABLE_CONTENT', message: 'Already exists!' });
    }
  }),
  renameAlbum: publicProcedure.input(AlbumRenameSchema).mutation(async ({ input }) => {
    const { name, userId, newName } = input;
    return albums.update({ where: { name_userId: { name, userId } }, data: { name: newName } });
  }),
  deleteAlbum: publicProcedure.input(AlbumSchema).mutation(async ({ input: name_userId }) => {
    return await albums.delete({ where: { name_userId } });
  })
});
