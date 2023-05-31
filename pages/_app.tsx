import '@/styles/globals.css';
import Head from 'next/head';
import Layout from '@/components/layout';
import { ThemeProvider } from 'next-themes';
import { AppPropsWithLayout } from '@/types';
import { SessionProvider } from 'next-auth/react';
import { withTRPC } from '@trpc/next';
import { AppType } from 'next/app';
import { AppRouter } from '@/server/router';
import { trpcOptions } from '@/utils/trpc';

const MyApp: AppType = ({
  router,
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page);

  const isAuthRoute = ['/login', '/register'].includes(router.pathname);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Scatch</title>
      </Head>
      <SessionProvider session={session}>
        <Layout empty={isAuthRoute}>{getLayout(<Component {...pageProps} />)}</Layout>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default withTRPC<AppRouter>(trpcOptions)(MyApp);
