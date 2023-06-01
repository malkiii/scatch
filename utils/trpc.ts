import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@/server/router';

export const trpcOptions = {
  config() {
    return {
      links: [
        httpBatchLink({
          url: process.env.NEXT_PUBLIC_APP_URL + '/api/trpc'
        })
      ]
    };
  },
  ssr: false
};
