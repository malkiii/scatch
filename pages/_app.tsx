import '@/styles/globals.css';
import Head from 'next/head';
import Layout from '@/components/layout';
import { ThemeProvider } from 'next-themes';
import { AppPropsWithLayout } from '@/types';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({
  router,
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page);

  const isAuthRoute = ['/login', '/register'].includes(router.pathname);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Head>
        <title>Scatch</title>
      </Head>
      <SessionProvider session={session}>
        <Layout empty={isAuthRoute}>{getLayout(<Component {...pageProps} />)}</Layout>
      </SessionProvider>
    </ThemeProvider>
  );
}
