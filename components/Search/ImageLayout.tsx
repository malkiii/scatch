import Image from 'next/image';
import { FC, useState, useRef, useEffect } from 'react';
import { ResponseImage } from '../../hooks/useFetch';
import { CgMathPlus, CgSoftwareDownload } from 'react-icons/cg';

type ImageLayoutProps = {
  images: ResponseImage[];
};

type ImageCoverProps = {
  image: ResponseImage;
};

const ImageCover: FC<ImageCoverProps> = ({ image }) => {
  const logoSize = 25;
  const downloadURL = `${image.src}?cs=srgb&dl=scatch-${image.id}.jpg&fm=jpg`;
  return (
    <>
      <a
        href={downloadURL}
        className="sm:hidden absolute bottom-5 right-5 text-white hover:text-theme transition-colors p-2"
      >
        <CgSoftwareDownload size={40} />
      </a>
      <div className="hidden sm:block image-layout-cover">
        <a href="" className="image-layout-btn absolute top-5 right-5">
          <CgMathPlus size={logoSize} />
        </a>
        <div className="absolute w-full bottom-0 p-5 flex items-center justify-between">
          <strong className="font-normal text-white">
            By {image.photographer}
          </strong>
          <a href={downloadURL} className="image-layout-btn">
            <CgSoftwareDownload size={logoSize} />
          </a>
        </div>
      </div>
    </>
  );
};

const PreloadLayout: FC = () => {
  return (
    <>
      {new Array(3).fill(null).map((_, col) => (
        <div key={col} className="grid grid-cols-1 flex-grow gap-y-4">
          {new Array(3).fill(null).map((_, row) => (
            <div key={col + row * 3} className="h-96 bg-neutral-500/5"></div>
          ))}
        </div>
      ))}
    </>
  );
};

const ImageLayout: FC<ImageLayoutProps> = ({ images }) => {
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
          <div key={col} className="grid grid-cols-1 flex-grow gap-y-4">
            {new Array(getRowsNumber()).fill(null).map((_, row) => {
              const imageIndex = col + row * columnsNumber;
              const currentImage = images[imageIndex];
              if (!currentImage) return <></>;
              return (
                <div
                  key={currentImage.id}
                  className="relative"
                  style={{ backgroundColor: currentImage.avgColor }}
                >
                  <Image
                    src={currentImage.src + '?auto=compress&cs=tinysrgb&w=940'}
                    width={currentImage.width}
                    height={currentImage.height}
                    alt="scatch image"
                  />
                  <ImageCover image={currentImage} />
                </div>
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
