import { FC } from 'react';

type ImageLayoutProps = {
  images: any[];
};

const ImageLayout: FC<ImageLayoutProps> = props => {
  return (
    <div className="w-full grid grid-cols-images gap-3 items-start">
      {props.images.map((image, index) => (
        <img key={index} src={image.src.large} alt="image" />
      ))}
    </div>
  );
};
export default ImageLayout;
