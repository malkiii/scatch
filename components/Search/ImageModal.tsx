import { default as Img } from 'next/image';
import { CgMathPlus } from 'react-icons/cg';
import { ResponseImage } from '../../hooks/useFetch';
import { FC, useState, useEffect, useRef, CSSProperties } from 'react';

type ImageModalProps = {
  image: ResponseImage;
  close?: () => void;
};

type LoadedImageProps = ImageModalProps & {
  style?: CSSProperties;
};

// type ZoomWindowProps = {
//   imageSrc: string;
//   closeWindow: () => void;
// };

// const ZoomWindow: FC<ZoomWindowProps> = ({ imageSrc, closeWindow }) => {
//   const WindowStyle = {
//     background: `url(${imageSrc}) no-repeat`
//   };
//   return (
//     <div
//       style={WindowStyle}
//       className="w-5/6 h-[90vh] overflow-hidden cursor-zoom-out"
//       onClick={closeWindow}
//     ></div>
//   );
// };

const LoadedImage: FC<LoadedImageProps> = props => {
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const { image, style, close: toggleWindow } = props;
  const { width, height, src, avgColor } = image;
  const imageProps = { src, width, height, style, alt: 'scatch image' };

  const preloadImageURL = `${image.src}?auto=compress&cs=tinysrgb&w=4`;
  const setBlurhashImage = async () => {
    await new Promise((res, rej) => {
      const preloadImage = new Image();
      preloadImage.crossOrigin = 'Anonymous';

      preloadImage.onload = () => {
        const blurAmount = 30;
        const canvas = document.createElement('canvas');
        canvas.width = preloadImage.width;
        canvas.height = preloadImage.height;

        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(preloadImage, 0, 0);

        ctx.filter = `blur(${blurAmount}px)`;
        ctx.drawImage(canvas, 0, 0);

        const container = imageContainerRef.current!;
        if (container) {
          container.style.backgroundImage = `url(${canvas.toDataURL()})`;
          container.style.backgroundColor = avgColor;
        }
        res(preloadImage);
      };
      preloadImage.onerror = (...args) => rej(args);
      preloadImage.src = preloadImageURL;
    });
  };

  useEffect(() => {
    setBlurhashImage();
  }, []);

  return (
    <div
      ref={imageContainerRef}
      className="relative w-full cursor-zoom-in bg-no-repeat bg-cover overflow-hidden"
    >
      <Img {...imageProps} onClick={toggleWindow} />
    </div>
  );
};

const ImageModal: FC<ImageModalProps> = ({ image, close }) => {
  const [inZoomMod, setInZoomMod] = useState<boolean>(false);

  const logoSize = 25;
  const { id, width, height } = image;
  const aspectRatio = width + '/' + height;
  const downloadURL = `${image.src}?cs=srgb&dl=scatch-${id}.jpg&fm=jpg`;

  function cancelClosing(e: any) {
    e.stopPropagation();
  }
  function toggleWindow() {
    setInZoomMod(!inZoomMod);
  }

  const imageStyles: CSSProperties | undefined = inZoomMod
    ? {
        scale: '3'
      }
    : undefined;

  return (
    <div
      className={'max-h-[80vh] ' + (inZoomMod ? 'w-full overflow-hidden' : '')}
      style={{ aspectRatio }}
    >
      {!inZoomMod && (
        <div className="flex items-center justify-between pb-5" onClick={close}>
          <strong className="font-normal text-white">
            By {image.photographer}
          </strong>
          <div className="flex items-center gap-3">
            <a href="#!" className="modal-btn" onClick={cancelClosing}>
              <CgMathPlus size={logoSize} />
            </a>
            <a href={downloadURL} className="modal-btn" onClick={cancelClosing}>
              download
            </a>
          </div>
        </div>
      )}
      <LoadedImage image={image} close={toggleWindow} style={imageStyles} />
    </div>
  );
};
export default ImageModal;
