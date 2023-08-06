import { db } from '@/server/db/client';
import { publicProcedure, router } from '@/server/trpc';
import { z } from 'zod';

export const userRouter = router({
  getUser: publicProcedure.input(z.string()).query(({ input: id }) => {
    return db.user.findUnique({ where: { id } });
  })
});

export { userImageRouter } from './userImageRouter';
export { userAlbumRouter } from './userAlbumsRouter';
export { userStatsRouter } from './userStatsRouter';
