import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ImageLayer } from './ImageLayer';
import { default as Img } from 'next/image';
import SearchImageModal from './SearchImageModal';
import { ResponseImage } from '../../hooks/useInfinitScroll';
import { useGridColumnsNumber } from '../../hooks/useGridColumnsNumber';

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
  const { id, width, height, src, avgColor } = image;

  const imageURL = `${src}?auto=compress&cs=tinysrgb&w=940`;

  const layerProps = { image, hasMobileSize };
  const linkProps = {
    href: {
      pathname,
      query: { query: id, i: index }
    },
    as: `/image/${id}`,
    className: 'relative',
    shallow: true
  };

  return (
    <Link {...linkProps}>
      <ImageLayer {...layerProps}>
        <Img
          key={id}
          src={imageURL}
          width={width}
          height={height}
          style={{ backgroundColor: avgColor }}
          alt="scatch image"
        />
      </ImageLayer>
    </Link>
  );
};

const ImageGridLayout: FC<ImageLayoutProps> = ({ pagePath, images }) => {
  const router = useRouter();
  const { columnsNumber, containerRef } = useGridColumnsNumber();

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
      <SearchImageModal images={images} pagePath={pagePath} />
    </>
  );
};
export default ImageGridLayout;
