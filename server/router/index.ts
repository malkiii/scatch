import { mergeRouters } from '../trpc';
import { userAlbumRouter, userImageRouter, userRouter, userStatsRouter } from './dashboard';
import { imageRouter } from './imageRouter';
import { settingsRouter } from './settingsRouter';
import { translateRouter } from './translateRouter';

export const appRouter = mergeRouters(
  imageRouter,
  translateRouter,
  settingsRouter,
  // dashboard
  userRouter,
  userImageRouter,
  userAlbumRouter,
  userStatsRouter
);

// export a caller for server-side calls
export const caller = appRouter.createCaller({});

// export type definition of API
export type AppRouter = typeof appRouter;
