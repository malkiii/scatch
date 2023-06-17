import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { FC, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import Progressbar from './Progressbar';
import { AppPropsWithLayout } from '@/types';
import { WithRouterProps } from 'next/dist/client/with-router';

const WithNavbarAndFooter: FC<layoutProps> = ({ session, children }) => {
  return (
    <>
      <Navbar session={session} />
      {children}
      <Footer />
    </>
  );
};

type layoutProps = WithRouterProps & {
  session: AppPropsWithLayout['currentSession'];
  children: ReactNode;
};
const Layout: FC<layoutProps> = props => {
  const { router, children } = props;
  const { systemTheme } = useTheme();
  const favionPath = `/favicon-${systemTheme || 'dark'}.ico`;
  const isAuthRoute = ['/login', '/register'].includes(router.pathname);

  return (
    <>
      <Head>
        <link rel="icon" href={favionPath} />
      </Head>
      <Progressbar />
      {isAuthRoute ? <>{children}</> : <WithNavbarAndFooter {...props} />}
    </>
  );
};
export default Layout;
