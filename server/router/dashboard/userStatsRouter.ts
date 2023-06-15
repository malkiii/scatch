import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure } from '@/server/trpc';

export const userStatsRouter = router({
  // saveSearchAcion: publicProcedure.input(z.string()).query(async ({ input }) => {}),
  // saveDownloadAcion: publicProcedure.input(z.string()).query(async ({ input }) => {}),
  // getCurrentStats: publicProcedure.input(z.string()).query(async ({ input }) => {})
});
