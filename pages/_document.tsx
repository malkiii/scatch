import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body className="bg-white dark:bg-dark text-dark dark:text-white font-monsterrat overflow-x-hidden transition-colors">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
