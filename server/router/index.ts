import { mergeRouters } from '../trpc';
import { imageRouter } from './imageRouter';
import { translateRouter } from './translateRouter';
import { userImageRouter, userAlbumRouter, userStatsRouter } from './dashboard';

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
