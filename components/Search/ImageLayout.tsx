import Image from 'next/image';
import { FC, useState, useEffect } from 'react';
import { ResponseImage } from '../../hooks/useFetch';
import { CgMathPlus, CgSoftwareDownload } from 'react-icons/cg';

type ImageLayoutProps = {
  images: ResponseImage[];
};

const ImageLayout: FC<ImageLayoutProps> = ({ images }) => {
  function updateColumnsNumber() {
    const windowHeight = window.innerWidth;
    setColumnsNumber(windowHeight > 1240 ? 3 : windowHeight > 855 ? 2 : 1);
  }

  const [columnsNumber, setColumnsNumber] = useState<number>(3);
  const imageNumber = images.length;

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
            const theImage = images[imageIndex];
            const logoSize = 25;
            const downloadURL = `${theImage.src}?cs=srgb&dl=scatch-${theImage.id}.jpg&fm=jpg`;
            return (
              <div
                key={theImage.id}
                className="relative"
                style={{ backgroundColor: theImage.avgColor }}
              >
                <Image
                  src={theImage.src + '?auto=compress&cs=tinysrgb&w=940'}
                  width={theImage.width}
                  height={theImage.height}
                  alt="scatch image"
                />
                <div className="image-layout-cover">
                  <a
                    href=""
                    className="image-layout-btn absolute top-5 right-5"
                  >
                    <CgMathPlus size={logoSize} />
                  </a>
                  <div className="absolute w-full bottom-0 p-5 flex items-center justify-between">
                    <strong className="font-normal text-white">
                      By {theImage.photographer}
                    </strong>
                    <a href={downloadURL} className="image-layout-btn">
                      <CgSoftwareDownload size={logoSize} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
export default ImageLayout;
