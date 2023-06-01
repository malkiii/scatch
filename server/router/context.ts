import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

export const createContext = async (opts?: trpcNext.CreateNextContextOptions) => {
  const req = opts?.req;
  const res = opts?.res;

  return { req, res, url: req?.url };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
