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
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preload" as="image" href="/logotype.svg" />
        <title>Scatch</title>
      </Head>
      <SessionProvider session={session}>
        <Layout route={router.pathname}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ThemeProvider>
  );
}
