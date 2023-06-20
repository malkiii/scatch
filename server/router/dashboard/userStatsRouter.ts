import { z } from 'zod';
import { db } from '@/server/db/client';
import { ActivityType } from '@prisma/client';
import { router, publicProcedure } from '@/server/trpc';

const stats = db.activity;

const ActivitySchema = z.object({
  userId: z.string(),
  type: z.nativeEnum(ActivityType)
});

export const userStatsRouter = router({
  saveActivity: publicProcedure.input(ActivitySchema).mutation(async ({ input }) => {
    const { userId, type } = input;
    return await stats.create({ data: { type, user: { connect: { id: userId } } } });
  }),
  getCurrentStats: publicProcedure.input(z.string()).query(async ({ input: userId }) => {
    return await stats.findMany({ where: { userId } });
  })
});
