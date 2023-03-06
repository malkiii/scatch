import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="text-dark dark:text-white dark:bg-dark font-monsterrat overflow-x-hidden transition-colors">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
