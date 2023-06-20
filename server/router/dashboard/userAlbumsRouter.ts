import { z } from 'zod';
import { db } from '@/server/db/client';
import { router, publicProcedure } from '@/server/trpc';

const albums = db.album;

const AlbumSchema = z.object({
  name: z.string(),
  userId: z.string()
});

const AlbumRenameSchema = AlbumSchema.merge(z.object({ newName: z.string() }));

export const userAlbumRouter = router({
  getAlbum: publicProcedure.input(AlbumSchema).query(async ({ input: name_userId }) => {
    return await albums.findUnique({ where: { name_userId }, include: { images: true } });
  }),
  getAllAlbums: publicProcedure.input(z.string()).query(async ({ input: userId }) => {
    return await albums.findMany({
      where: { userId },
      include: { images: { take: 1, select: { src: true } } }
    });
  }),
  addNewAlbum: publicProcedure.input(AlbumSchema).mutation(async ({ input }) => {
    const { name, userId } = input;
    return await albums.create({ data: { name, user: { connect: { id: userId } } } });
  }),
  renameAlbum: publicProcedure.input(AlbumRenameSchema).mutation(async ({ input }) => {
    const { name, userId, newName } = input;
    return albums.update({ where: { name_userId: { name, userId } }, data: { name: newName } });
  }),
  deleteAlbum: publicProcedure.input(AlbumSchema).mutation(async ({ input: name_userId }) => {
    return await albums.delete({ where: { name_userId } });
  })
});
