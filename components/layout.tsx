import Head from 'next/head';
import Navbar from './Navbar';
import { FC, ReactNode } from 'react';
import { useTheme } from 'next-themes';

type layoutProps = {
  children: ReactNode;
};

const Layout: FC<layoutProps> = ({ children }) => {
  const { systemTheme } = useTheme();
  return (
    <>
      <Head>
        <link rel="icon" href={`/favicon-${systemTheme || 'light'}.ico`} />
      </Head>
      <Navbar />
      {children}
    </>
  );
};
export default Layout;
