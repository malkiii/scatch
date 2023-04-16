import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { FC, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import Progressbar from './Progressbar';

type layoutProps = {
  children: ReactNode;
};

const Layout: FC<layoutProps> = ({ children }) => {
  const { systemTheme } = useTheme();
  const favionPath = `/favicon-${systemTheme || 'light'}.ico`;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favionPath} />
        <link rel="preload" as="image" href="/logotype.svg" />
      </Head>
      <Progressbar />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
