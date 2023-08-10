import '@/styles/globals.css';
import App from 'next/app';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { getSession, SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { AppPropsWithLayout, AppType } from '@/types';
import { trpc } from '@/utils/trpc';
import Layout from '@/components/layout';
import OgImage from '@/components/OgImage';

const ScatchApp = trpc.withTRPC((props: AppPropsWithLayout) => {
  const {
    router,
    Component,
    pageProps: { session, ...pageProps },
    currentSession
  } = props;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark">
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <OgImage title="Scatch" />
            <title>Scatch</title>
          </Head>
          <Layout session={currentSession} router={router}>
            {getLayout(<Component {...pageProps} />)}
          </Layout>
        </ThemeProvider>
      </SessionProvider>
      <Analytics />
    </>
  );
}) as AppType;

// get the user session in the server side
ScatchApp.getInitialProps = async context => {
  const appProps = await App.getInitialProps(context);
  const currentSession = await getSession(context.ctx);
  return { ...appProps, currentSession };
};

export default ScatchApp;
