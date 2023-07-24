import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preload" as="image" href="/logotype.svg" />
        <link rel="preload" as="image" href="/mark.svg" />
      </Head>
      <body className="overflow-x-hidden bg-base-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
