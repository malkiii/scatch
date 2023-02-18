import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Scatch</title>
        <link
          rel="icon"
          href="favicon-dark.ico"
          media="(prefers-color-scheme: no-preference)"
        />
        <link
          rel="icon"
          href="favicon-light.ico"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="favicon-dark.ico"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
