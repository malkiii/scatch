import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure } from '@/server/trpc';

export const userAlbumRouter = router({
  addNewAlbum: publicProcedure.input(z.string()).query(async ({ input }) => {})
  // renameAlbum: publicProcedure.input(z.string()).query(async ({ input }) => {}),
  // deleteAlbum: publicProcedure.input(z.string()).query(async ({ input }) => {}),
});
