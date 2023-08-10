import { FC } from 'react';
import { siteInfos } from '@/data/constants';

type OgImageProps = {
  title: string;
  description: string;
  route: `/${string}`;
};
const OgImage: FC<Partial<OgImageProps>> = ({ title, description, route = '' }) => {
  const ogImage = {
    title: title || siteInfos.name,
    description: description || siteInfos.description,
    url: new URL(`/api/og${route}`, process.env.NEXT_PUBLIC_APP_URL).href,
    width: '1200',
    height: '630'
  };

  return (
    <>
      {/* Open-Graph */}
      <meta property="og:title" content={ogImage.title} />
      <meta property="og:description" content={ogImage.description} />
      <meta property="og:image" content={ogImage.url} />
      <meta property="og:image:width" content={ogImage.width} />
      <meta property="og:image:height" content={ogImage.height} />
      {/* Twitter */}
      <meta property="twitter:title" content={ogImage.title} />
      <meta property="twitter:description" content={ogImage.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage.url} />
      <meta name="twitter:image:width" content={ogImage.width} />
      <meta name="twitter:image:height" content={ogImage.height} />
      {/* alt */}
      <meta property="og:image:alt" content={ogImage.title} />
    </>
  );
};

export default OgImage;
