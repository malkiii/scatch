import type { AppRouter } from '@/server/router';
import type { QueryClientConfig } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    mutations: {
      retry: false
    },
    queries: {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  }
};

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    const { ctx } = opts;
    if (typeof window !== 'undefined') {
      // during client requests
      return {
        links: [httpBatchLink({ url: '/api/trpc' })],
        queryClientConfig
      };
    }

    return {
      links: [
        httpBatchLink({
          url: new URL('/api/trpc', process.env.NEXT_PUBLIC_APP_URL).href,
          headers() {
            if (!ctx?.req?.headers) return {};
            // To use SSR properly, you need to forward the client's headers to the server
            // This is so you can pass through things like cookies when we're server-side rendering

            const {
              // omit the "connection" header for Node < 18.15.0
              connection: _connection,
              ...headers
            } = ctx.req.headers;
            return headers;
          }
        })
      ],
      queryClientConfig
    };
  },
  ssr: false
});
