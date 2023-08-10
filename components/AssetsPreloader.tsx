import { FC } from 'react';

type AssetsPreloaderProps = {
  assets: string[];
  as?: 'image' | 'font' | 'style' | 'script' | 'video';
};
const AssetsPreloader: FC<AssetsPreloaderProps> = ({ assets, as }) => {
  return (
    <>
      {assets.map((url, index) => (
        <link key={index} rel="preload" as={as} href={url} />
      ))}
    </>
  );
};

export default AssetsPreloader;
