import { FC, useState, useEffect } from 'react';

type ImageLayoutProps = {
  images: any[];
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
      className="w-full grid gap-3"
      style={{ gridTemplateColumns: `repeat(${columnsNumber}, 1fr)` }}
    >
      {new Array(columnsNumber).fill(null).map((_, col) => (
        <div key={col} className="flex flex-col flex-grow gap-3">
          {new Array(imageNumber / columnsNumber).fill(null).map((_, row) => {
            const imageIndex = col + row * columnsNumber;
            return (
              <img
                key={imageIndex}
                src={images[imageIndex].src.large}
                alt="scatch image"
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
export default ImageLayout;
