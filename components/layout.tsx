import Head from 'next/head';
import Navbar from './Navbar';
import { FC, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import Progressbar from './Progressbar';

type layoutProps = {
  children: ReactNode;
};

const Layout: FC<layoutProps> = ({ children }) => {
  const { systemTheme } = useTheme();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={`/favicon-${systemTheme || 'light'}.ico`} />
      </Head>
      <Progressbar />
      <Navbar />
      {children}
    </>
  );
};
export default Layout;
