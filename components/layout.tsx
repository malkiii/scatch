import Head from 'next/head';
import Navbar from './Navbar';
import { FC, ReactNode } from 'react';

type layoutProps = {
  children: ReactNode;
};

const Layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Scatch</title>
        <link
          rel="icon"
          href="/favicon-light.ico"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/favicon-dark.ico"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <Navbar />
      {children}
    </>
  );
};
export default Layout;
