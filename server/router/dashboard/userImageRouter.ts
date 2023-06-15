import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure } from '@/server/trpc';

export const userImageRouter = router({
  addNewImage: publicProcedure.input(z.string()).query(async ({ input }) => {})
  // deleteImage: publicProcedure.input(z.string()).query(async ({ input }) => {}),
  // getAllImages: publicProcedure.input(z.string()).query(async ({ input }) => {}),
  // getAllFavoriteImages: publicProcedure.input(z.string()).query(async ({ input }) => {}),
  // setFavoriteImage: publicProcedure.input(z.string()).query(async ({ input }) => {}),
});
