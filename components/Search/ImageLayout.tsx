import Link from 'next/link';
import Image from 'next/image';
import ImageLayer from './ImageLayer';
import { ResponseImage } from '../../hooks/useFetch';
import { FC, useState, useRef, useEffect } from 'react';

type ImageLayoutProps = {
  pathname: string;
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

const ImageLayout: FC<ImageLayoutProps> = ({ pathname, images }) => {
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

  useEffect(() => {
    updateColumnsNumber();
    window.addEventListener('resize', updateColumnsNumber);
    return () => {
      window.removeEventListener('resize', updateColumnsNumber);
    };
  }, []);

  return (
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
                  href={pathname}
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
  );
};
export default ImageLayout;
