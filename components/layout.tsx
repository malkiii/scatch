import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { FC, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import Progressbar from './Progressbar';

type withChildren = {
  children: ReactNode;
};
type layoutProps = withChildren & {
  route: string;
};

const WithNavbarAndFooter: FC<withChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

const Layout: FC<layoutProps> = ({ route, children }) => {
  const { systemTheme } = useTheme();
  const favionPath = `/favicon-${systemTheme || 'dark'}.ico`;
  const exculdedRoutes = ['/login', '/register'];
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favionPath} />
        <link rel="preload" as="image" href="/logotype.svg" />
        <title>Scatch</title>
      </Head>
      <Progressbar />
      {exculdedRoutes.includes(route) ? (
        <>{children}</>
      ) : (
        <WithNavbarAndFooter>{children}</WithNavbarAndFooter>
      )}
    </>
  );
};
export default Layout;
