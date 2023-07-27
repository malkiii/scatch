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
import ScrollToTopButton from './ScrollToTopButton';

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

type NestedLayoutProps = layoutProps & { navbar: boolean };
const WithNavbarAndFooter: FC<NestedLayoutProps> = ({ session, children, navbar }) => {
  if (!navbar) return <>{children}</>;
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
  const isAuthRoute = ['/login', '/register'].includes(props.router.pathname);

  return (
    <>
      <Head>
        <link rel="icon" href={favionPath} />
      </Head>
      <div
        id="layout"
        className={cn(
          'relative bg-base-100 font-sans antialiased',
          { 'mb-[460px] md:mb-80': !isAuthRoute },
          fontHeading.variable,
          fontSans.variable
        )}
      >
        <Progressbar />
        <WithNavbarAndFooter {...props} navbar={!isAuthRoute} />
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default Layout;
