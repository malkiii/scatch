import { mergeRouters } from '../trpc';
import { ImageRouter } from './imageRouter';
import { translateRouter } from './translateRouter';

export const appRouter = mergeRouters(ImageRouter, translateRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
