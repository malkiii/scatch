import Image from 'next/image';
import { FC, useState, useEffect } from 'react';
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

const ImageLayout: FC<ImageLayoutProps> = ({ images }) => {
  function updateColumnsNumber() {
    const windowWidth = window.innerWidth;
    setColumnsNumber(windowWidth > 1240 ? 3 : windowWidth > 750 ? 2 : 1);
  }

  const imageNumber = images.length;
  const [columnsNumber, setColumnsNumber] = useState<number>(3);

  useEffect(() => {
    updateColumnsNumber();
    window.addEventListener('resize', updateColumnsNumber);
    return () => {
      window.removeEventListener('resize', updateColumnsNumber);
    };
  });

  return (
    <div
      className="w-full grid gap-4 items-start"
      style={{ gridTemplateColumns: `repeat(${columnsNumber}, 1fr)` }}
    >
      {new Array(columnsNumber).fill(null).map((_, col) => (
        <div key={col} className="grid grid-cols-1 flex-grow gap-y-4">
          {new Array(imageNumber / columnsNumber).fill(null).map((_, row) => {
            const imageIndex = col + row * columnsNumber;
            const currentImage = images[imageIndex];
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
      ))}
    </div>
  );
};
export default ImageLayout;
