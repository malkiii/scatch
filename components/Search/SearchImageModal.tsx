import ImageModal from '../ImageModal';
import getBlurhash from '@utils/blurhash';
import { ResponseImage } from '@utils/types';
import { FC, useEffect, useRef } from 'react';
import { useModalRoute } from '@hooks/useModalRoute';
import { DownloadButton, PhotographerName, SaveButton } from './ImageLayer';

type ImageNavProps = {
  image: ResponseImage;
  onClick?: () => void;
};

const ImageNavbar: FC<ImageNavProps> = ({ image, onClick }) => {
  return (
    <div className="flex items-center justify-between pb-5" onClick={onClick}>
      <PhotographerName name={image.photographer} />
      <div className="flex items-center gap-3">
        <SaveButton />
        <DownloadButton image={image} content="text" />
      </div>
    </div>
  );
};

type ModalProps = {
  images: ResponseImage[];
  pagePath: string;
};

const SearchImageModal: FC<ModalProps> = props => {
  const { images, pagePath } = props;
  const { modalIndex, modalActions } = useModalRoute(images, pagePath);
  if (modalIndex == null) return <></>;

  const imageContainerRef = useRef<HTMLDivElement>(null);

  const currentImage = images[modalIndex];
  const { src, avgColor } = currentImage;
  const preloadImageURL = `${src}?auto=compress&cs=tinysrgb&w=4`;

  const preloadBlurhashImage = async () => {
    const blurhash = await getBlurhash(preloadImageURL);
    const container = imageContainerRef.current!;
    if (container) {
      const image = container.firstElementChild as HTMLImageElement;
      image.style.backgroundImage = `url(${blurhash})`;
      image.style.backgroundColor = avgColor;
    }
  };

  useEffect(() => {
    preloadBlurhashImage();
  });

  return (
    <ImageModal
      key={modalIndex}
      image={currentImage}
      containerRef={imageContainerRef}
      actions={modalActions}
    >
      <ImageNavbar image={currentImage} onClick={modalActions.close} />
    </ImageModal>
  );
};
export default SearchImageModal;
