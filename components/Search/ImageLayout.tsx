import Image from 'next/image';
import { FC, useState, useEffect } from 'react';
import { ResponseImage } from '../../hooks/useFetch';

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
      className="w-full grid gap-3 items-start"
      style={{ gridTemplateColumns: `repeat(${columnsNumber}, 1fr)` }}
    >
      {new Array(columnsNumber).fill(null).map((_, col) => (
        <div key={col} className="grid grid-cols-1 flex-grow gap-y-3">
          {new Array(imageNumber / columnsNumber).fill(null).map((_, row) => {
            const imageIndex = col + row * columnsNumber;
            const theImage = images[imageIndex];
            return (
              <Image
                key={theImage.id}
                src={theImage.src + '?auto=compress&cs=tinysrgb&w=940'}
                width={theImage.width}
                height={theImage.height}
                alt="scatch image"
                style={{ backgroundColor: theImage.avgColor }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
export default ImageLayout;
