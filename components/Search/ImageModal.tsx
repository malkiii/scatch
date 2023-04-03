import { CSSProperties, FC } from 'react';
import { default as Img } from 'next/image';
import { CgMathPlus } from 'react-icons/cg';
import { useState, useEffect, useRef } from 'react';
import { ResponseImage } from '../../hooks/useFetch';

type ImageModalProps = {
  image: ResponseImage;
  close?: () => void;
};

type LoadedImageProps = ImageModalProps & {
  zoom: boolean;
};

const LoadedImage: FC<LoadedImageProps> = props => {
  const { image, zoom, close: toggleWindow } = props;

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { src, width, height, avgColor } = image;
  const preloadImageURL = `${src}?auto=compress&cs=tinysrgb&w=4`;

  function getImageElement() {
    const container = imageContainerRef.current!;
    const image = container.firstElementChild as HTMLImageElement;
    return image;
  }

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

        const blurhashURL = canvas.toDataURL();
        const container = imageContainerRef.current!;
        if (container) {
          const image = container.firstElementChild as HTMLImageElement;
          image.style.backgroundImage = `url(${blurhashURL})`;
          image.style.backgroundColor = avgColor;
        }
        res(preloadImage);
      };
      preloadImage.onerror = (...args) => rej(args);
      preloadImage.src = preloadImageURL;
    });
  };

  function handleMouseMove(event: any) {
    if (!zoom) return;
    const { pageX, pageY } = event;
    const container = imageContainerRef.current!;
    const viewRect = container.parentElement! as HTMLDivElement;
    const { offsetHeight: height, offsetWidth: width } = viewRect;
    const offsetX = viewRect.offsetLeft + window.scrollX;
    const offsetY = viewRect.offsetHeight + window.scrollY;
    const posX = pageX - offsetX - width / 2;
    const posY = pageY - offsetY;
    const x = (posX / width) * 100;
    const y = (posY / height) * 100 + 45;
    getImageElement().style.transform = `translate(${-x}%, ${-y}%)`;
  }

  function handleMouseClick() {
    if (zoom) getImageElement().style.transform = 'none';
    if (toggleWindow) toggleWindow();
  }

  const isPortrait = height > width;
  const style: CSSProperties | undefined = zoom
    ? {
        scale: isPortrait ? '1.1' : '1.65',
        transformOrigin: 'center',
        transition: 'all 100ms ease-out'
      }
    : undefined;

  const imageProps = { width, height, src, style, alt: 'scatch image' };

  useEffect(() => {
    setBlurhashImage();
  }, []);

  return (
    <div
      ref={imageContainerRef}
      className="flex items-center cursor-zoom-in"
      onMouseMove={handleMouseMove}
      onClick={handleMouseClick}
    >
      <Img {...imageProps} className="bg-no-repeat bg-cover" />
    </div>
  );
};

const ImageModal: FC<ImageModalProps> = ({ image, close }) => {
  const [inZoomMod, setInZoomMod] = useState<boolean>(false);

  const logoSize = 25;
  const { id, width, height } = image;
  const downloadURL = `${image.src}?cs=srgb&dl=scatch-${id}.jpg&fm=jpg`;

  function cancelClosing(e: any) {
    e.stopPropagation();
  }
  function toggleWindow() {
    setInZoomMod(!inZoomMod);
  }

  const aspectRatio = width + '/' + height;

  return (
    <div
      className={
        inZoomMod
          ? 'flex items-center justify-center w-full h-full overflow-hidden'
          : 'max-h-[80vh]'
      }
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
      <LoadedImage image={image} zoom={inZoomMod} close={toggleWindow} />
    </div>
  );
};
export default ImageModal;
