import { FC } from 'react';
import { default as Img } from 'next/image';
import { useRouter } from 'next/router';
import { Image as UserImage } from '@prisma/client';
import { ResponseImage } from '@/types';
import { getImageModalRouteQuery, getResizedImage } from '@/utils';
import { useGridColumnsNumber } from '@/hooks/useGridColumnsNumber';
import { useModalRoute } from '@/hooks/useModalRoute';
import DashboardImageModal from './Dashboard/DashboardImageModal';
import { ImageLayer } from './ImageLayer';
import SearchImageModal from './Search/SearchImageModal';

type GridImageProps = {
  index: number;
  pathname: string;
  image: ResponseImage | UserImage;
  hasMobileSize: boolean;
};
const GridImage: FC<GridImageProps> = props => {
  const { index, image, pathname, hasMobileSize } = props;

  const query = getImageModalRouteQuery(pathname, image.id, index);
  const layerProps = {
    image,
    hasMobileSize,
    linkProps: {
      href: { pathname, query },
      as: `/image/${image.id}`,
      shallow: true
    }
  };

  return (
    <ImageLayer {...layerProps}>
      <Img
        key={image.id}
        src={getResizedImage(image.src, 940)}
        width={image.width}
        height={image.height}
        style={{ backgroundColor: image.avgColor }}
        alt="scatch image"
      />
    </ImageLayer>
  );
};

const PlaceholderLayout: FC = () => {
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

type ImageLayoutProps = {
  pagePath: string;
  images: ResponseImage[] | UserImage[];
};
const ImageGridLayout: FC<ImageLayoutProps> = ({ pagePath, images }) => {
  const router = useRouter();
  const isSearchRoute = pagePath.startsWith('/search');
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
        data-test="images-grid-layout"
        ref={containerRef}
        style={{ '--col-min-width': '320px' } as any}
        className="grid w-full grid-cols-fill items-start gap-4 md:px-4"
      >
        {columnsNumber && images.length ? (
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
          <PlaceholderLayout />
        )}
      </div>
      {shouldShowModal && isSearchRoute && (
        <SearchImageModal
          index={modalIndex}
          image={images[modalIndex] as ResponseImage}
          modalActions={modalActions}
        />
      )}
      {shouldShowModal && !isSearchRoute && (
        <DashboardImageModal
          index={modalIndex}
          image={images[modalIndex] as UserImage}
          modalActions={modalActions}
        />
      )}
    </>
  );
};
export default ImageGridLayout;
