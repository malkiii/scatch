import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

export const createContext = async (opts?: trpcNext.CreateNextContextOptions) => {};
export type Context = trpc.inferAsyncReturnType<typeof createContext>;
