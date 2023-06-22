import { mergeRouters } from '../trpc';
import { userAlbumRouter, userImageRouter, userStatsRouter } from './dashboard';
import { imageRouter } from './imageRouter';
import { translateRouter } from './translateRouter';

export const appRouter = mergeRouters(
  imageRouter,
  translateRouter,
  // dashboard
  userImageRouter,
  userAlbumRouter,
  userStatsRouter
);
export const caller = appRouter.createCaller({});

// export type definition of API
export type AppRouter = typeof appRouter;
