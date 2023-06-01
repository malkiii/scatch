import { TRPCError } from '@trpc/server';
import { publicProcedure, middleware } from '../trpc';

export const isAuthed = middleware(({ ctx, next }) => {
  const API_TOKEN = process.env.API_TOKEN as string;

  const isAuthorized = ctx.req?.headers.token === API_TOKEN;

  if (!isAuthorized) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});

export const imageAPIProcedure = publicProcedure.use(isAuthed);

// const appRouter = router({
//   greeting: protectedProcedure.query((opts) => {
//     return ``;
//   }),
// });
