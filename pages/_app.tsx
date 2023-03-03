import '../styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '../components/layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window !== 'undefined') {
    const theme = localStorage.getItem('theme') || 'dark';
    if (theme != 'dark') document.documentElement.classList.toggle('dark');
    if (!theme) {
      localStorage.setItem('theme', 'dark');
    }
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
