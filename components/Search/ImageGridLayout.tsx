import Link from 'next/link';
import Image from 'next/image';
import ImageModal from './ImageModal';
import ImageLayer from './ImageLayer';
import { useRouter } from 'next/router';
import { ResponseImage } from '../../hooks/useFetch';
import { FC, useState, useRef, useEffect } from 'react';

type ImageLayoutProps = {
  fullPath?: string;
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

const ImageGridLayout: FC<ImageLayoutProps> = ({ fullPath, images }) => {
  const router = useRouter();
  const { pathname } = router;
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnsNumber, setColumnsNumber] = useState<number>(0);

  function updateColumnsNumber() {
    const containerStyle = window.getComputedStyle(containerRef.current!);
    setColumnsNumber(containerStyle.gridTemplateColumns.split(' ').length);
  }

  function getRowsNumber(): number {
    const reminder = images.length % 6;
    const imageNumber = images.length + (reminder == 0 ? 0 : 6 - reminder);
    return imageNumber / columnsNumber;
  }

  function switchBy(imageNumber: number) {
    const imageIndex = Number(router.query.id) + imageNumber;
    const inRange = imageIndex >= 0 && imageIndex < images.length;
    if (!inRange) return;

    const href = `${pathname}?id=${imageIndex}`;
    const as = `/search/scatch-${images[imageIndex].id}`;
    router.push(href, as, { shallow: true });
  }

  function returnToMainPage() {
    router.push(fullPath || pathname);
  }

  useEffect(() => {
    updateColumnsNumber();
    window.addEventListener('resize', updateColumnsNumber);
    window.addEventListener('beforeunload', returnToMainPage);
    return () => {
      window.removeEventListener('resize', updateColumnsNumber);
      window.removeEventListener('beforeunload', returnToMainPage);
    };
  }, []);

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

                const imageURL = `${currentImage.src}?auto=compress&cs=tinysrgb&w=940`;
                return (
                  <Link
                    key={currentImage.id}
                    href={`${pathname}?id=${imageIndex}`}
                    as={`/search/scatch-${currentImage.id}`}
                    className="relative"
                    style={{ backgroundColor: currentImage.avgColor }}
                    shallow
                  >
                    <Image
                      src={imageURL}
                      width={currentImage.width}
                      height={currentImage.height}
                      alt="scatch image"
                    />
                    <ImageLayer image={currentImage} />
                  </Link>
                );
              })}
            </div>
          ))
        ) : (
          <PreloadLayout />
        )}
      </div>
      {!!router.query.id && (
        <ImageModal
          image={images[Number(router.query.id)]}
          next={() => switchBy(1)}
          prev={() => switchBy(-1)}
          close={() => {
            const href = fullPath || pathname;
            router.push(href, undefined, { shallow: true });
          }}
        />
      )}
    </>
  );
};
export default ImageGridLayout;
