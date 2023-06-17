import '@/styles/globals.css';
import App from 'next/app';
import Head from 'next/head';
import Layout from '@/components/layout';
import { trpc } from '@/utils/trpc';
import { ThemeProvider } from 'next-themes';
import { AppType, AppPropsWithLayout } from '@/types';
import { SessionProvider, getSession } from 'next-auth/react';

const MyApp = trpc.withTRPC((props: AppPropsWithLayout) => {
  const {
    router,
    Component,
    pageProps: { session, ...pageProps },
    currentSession
  } = props;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Scatch</title>
        </Head>
        <Layout session={currentSession} router={router}>
          {getLayout(<Component {...pageProps} />)}
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}) as AppType;

MyApp.getInitialProps = async context => {
  const appProps = await App.getInitialProps(context);
  const currentSession = await getSession(context.ctx);
  return { ...appProps, currentSession };
};

export default MyApp;
