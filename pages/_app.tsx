import '../styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '../components/layout';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

export default function MyApp({ Component, pageProps }: AppProps) {
  // set the theme with the 'dark' class
  function applyTheme() {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  }

  useEffect(() => {
    applyTheme();
  });

  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
