import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { FC, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import Progressbar from './Progressbar';

type withChildren = {
  children: ReactNode;
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

type layoutProps = withChildren & {
  empty: boolean;
};

const Layout: FC<layoutProps> = ({ empty, children }) => {
  const { systemTheme } = useTheme();
  const favionPath = `/favicon-${systemTheme || 'dark'}.ico`;
  return (
    <>
      <Head>
        <link rel="icon" href={favionPath} />
      </Head>
      <Progressbar />
      {empty ? (
        <>{children}</>
      ) : (
        <WithNavbarAndFooter>{children}</WithNavbarAndFooter>
      )}
    </>
  );
};
export default Layout;
