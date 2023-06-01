import { mergeRouters } from '../trpc';
import { exampleRouter } from './example';
import { imageAPIProcedure } from './imageAPIProcedure';

export const appRouter = mergeRouters(exampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
