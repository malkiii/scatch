import { FC } from 'react';
import { useRouter } from 'next/router';
import { ImageLayer } from './ImageLayer';
import { default as Img } from 'next/image';
import { ResponseImage } from '@/utils/types';
import SearchImageModal from './SearchImageModal';
import { useModalRoute } from '@/hooks/useModalRoute';
import { useGridColumnsNumber } from '@/hooks/useGridColumnsNumber';

type ImageLayoutProps = {
  pagePath: string;
  images: ResponseImage[];
};

const PreloadLayout: FC = () => {
  return (
    <>
      {new Array(3).fill(null).map((_, col) => (
        <div key={col} className="grid grid-cols-1 gap-y-4">
          {new Array(3).fill(null).map((_, row) => (
            <div key={col + row * 3} className="h-96 bg-neutral-500/5"></div>
          ))}
        </div>
      ))}
    </>
  );
};

type GridImageProps = {
  index: number;
  pathname: string;
  image: ResponseImage;
  hasMobileSize: boolean;
};

const GridImage: FC<GridImageProps> = props => {
  const { index, image, pathname, hasMobileSize } = props;
  const imageURL = `${image.src}?auto=compress&cs=tinysrgb&w=940`;

  const layerProps = {
    image,
    hasMobileSize,
    linkProps: {
      href: {
        pathname,
        query: { query: image.id, i: index }
      },
      as: `/image/${image.id}`,
      shallow: true
    }
  };

  return (
    <ImageLayer {...layerProps}>
      <Img
        key={image.id}
        src={imageURL}
        width={image.width}
        height={image.height}
        style={{ backgroundColor: image.avgColor }}
        alt="scatch image"
      />
    </ImageLayer>
  );
};

const ImageGridLayout: FC<ImageLayoutProps> = ({ pagePath, images }) => {
  const router = useRouter();
  const { columnsNumber, containerRef } = useGridColumnsNumber();
  const { modalIndex, modalActions } = useModalRoute(images, pagePath);
  const shouldShowModal = modalIndex != null;

  function getRowsNumber(): number {
    const reminder = images.length % 6;
    const imageNumber = images.length + (reminder == 0 ? 0 : 6 - reminder);
    return imageNumber / columnsNumber;
  }

  return (
    <>
      <div
        ref={containerRef}
        className="w-full grid grid-cols-images gap-4 items-start"
      >
        {columnsNumber ? (
          new Array(columnsNumber).fill(null).map((_, col) => (
            <div key={col} className="grid grid-cols-1 gap-y-4">
              {new Array(getRowsNumber()).fill(null).map((_, row) => {
                const imageIndex = col + row * columnsNumber;
                const currentImage = images[imageIndex];
                if (!currentImage) return <></>;

                const { id } = currentImage;
                return (
                  <GridImage
                    key={id}
                    index={imageIndex}
                    image={currentImage}
                    pathname={router.pathname}
                    hasMobileSize={columnsNumber == 1}
                  />
                );
              })}
            </div>
          ))
        ) : (
          <PreloadLayout />
        )}
      </div>
      {shouldShowModal && (
        <SearchImageModal
          index={modalIndex}
          image={images[modalIndex]}
          modalActions={modalActions}
        />
      )}
    </>
  );
};
export default ImageGridLayout;
