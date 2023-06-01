import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const exampleRouter = router({
  sayHello: publicProcedure.input(z.object({ name: z.string() })).query(({ input }) => {
    return 'hello, ' + input.name;
  })
});
