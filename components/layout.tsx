import { FC, ReactNode } from 'react';
import { WithRouterProps } from 'next/dist/client/with-router';
import { Inter as FontHeading, Poppins as FontSans } from 'next/font/google';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import { AppPropsWithLayout } from '@/types';
import { cn } from '@/utils';
import Footer from './Footer';
import Navbar from './Navbar';
import Progressbar from './Progressbar';

const fontHeading = FontHeading({
  subsets: ['latin'],
  variable: '--font-heading'
});

const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans'
});

const useFavicon = (): string => {
  const { systemTheme } = useTheme();
  return `/favicon-${systemTheme || 'dark'}.ico`;
};

const WithNavbarAndFooter: FC<layoutProps> = ({ session, router, children }) => {
  const isAuthRoute = ['/login', '/register'].includes(router.pathname);

  if (isAuthRoute) return <>{children}</>;
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
  const favionPath = useFavicon();
  return (
    <>
      <Head>
        <link rel="icon" href={favionPath} />
      </Head>
      <div
        className={cn(
          'text-text bg-background overflow-x-hidden font-sans antialiased',
          fontHeading.variable,
          fontSans.variable
        )}
      >
        <Progressbar />
        <WithNavbarAndFooter {...props} />
      </div>
    </>
  );
};
export default Layout;
