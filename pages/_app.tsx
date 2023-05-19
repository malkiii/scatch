import '@/styles/globals.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import Layout from '@/components/layout';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({
  router,
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  const isAuthRoute = ['/login', '/register'].includes(router.pathname);
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preload" as="image" href="/logotype.svg" />
        <link rel="preload" as="image" href="/mark.svg" />
        <title>Scatch</title>
      </Head>
      <SessionProvider session={session}>
        <Layout empty={isAuthRoute}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ThemeProvider>
  );
}
