import { Html, Head, Main, NextScript } from 'next/document';

// prettier-ignore
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preload" as="font" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap" crossOrigin="Anonymous" />
        <link rel="preload" as="font" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap" crossOrigin="Anonymous" />
        <link rel="preload" as="image" href="/logotype.svg" />
        <link rel="preload" as="image" href="/mark.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
