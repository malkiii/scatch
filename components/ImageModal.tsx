import {
  CSSProperties,
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useRef,
  useState
} from 'react';
import Image from 'next/image';
import { IoIosArrowBack as LeftArrow, IoIosArrowForward as RightArrow } from 'react-icons/io';
import { ModalActions, ModalImage } from '@/types';
import { cn } from '@/utils';
import { useBlurhashImage } from '@/hooks/useBlurhashImage';

type LoadedImageProps = {
  image: ModalImage;
  inZoomMod: boolean;
  toggleZoom: () => void;
};
const LoadedImage: FC<LoadedImageProps> = props => {
  const { image, inZoomMod, toggleZoom } = props;
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const { src, width, height } = image;
  useBlurhashImage(imageContainerRef, src);

  function getImageElement() {
    const container = imageContainerRef.current!;
    const image = container.firstElementChild as HTMLImageElement;
    return image;
  }

  const handleMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>(
    event => {
      if (!inZoomMod) return;
      const container = imageContainerRef.current;
      if (!container) return;

      const { pageX, pageY } = event;
      const viewRect = container.parentElement! as HTMLDivElement;
      const { offsetHeight: height, offsetWidth: width } = viewRect;
      const offsetX = viewRect.offsetLeft + window.scrollX;
      const offsetY = viewRect.offsetHeight + window.scrollY;
      const posX = pageX - offsetX - width / 2;
      const posY = pageY - offsetY;
      const x = (posX / width) * 100;
      const y = (posY / height) * 100 + 45;

      getImageElement().style.transform = `translate(${-x}%, ${-y}%)`;
    },
    [imageContainerRef, inZoomMod]
  );

  function handleMouseClick() {
    if (inZoomMod) getImageElement().style.transform = 'none';
    toggleZoom();
  }

  const isPortrait = height > width;
  const style: CSSProperties = inZoomMod
    ? {
        scale: isPortrait ? '1.1' : '1.65',
        transformOrigin: 'center',
        transition: 'all 100ms ease-out'
      }
    : {};

  const imageProps = { width, height, src, style };

  return (
    <div
      ref={imageContainerRef}
      className="flex cursor-zoom-in items-center"
      onMouseMove={handleMouseMove}
      onClick={handleMouseClick}
    >
      <Image {...imageProps} className="bg-cover bg-no-repeat" alt="scatch image" />
    </div>
  );
};

type ImageContainerProps = {
  image: ModalImage;
  children?: ReactNode;
};
const ImageContainer: FC<ImageContainerProps> = props => {
  const { image, children } = props;
  const [inZoomMod, setInZoomMod] = useState<boolean>(false);

  const zoomImageProps = { image, inZoomMod, toggleZoom: () => setInZoomMod(!inZoomMod) };

  return (
    <div
      style={{ aspectRatio: image.width + '/' + image.height }}
      className={cn({
        'flex h-full w-full items-center justify-center overflow-hidden': inZoomMod,
        'max-h-[80vh]': !inZoomMod
      })}
    >
      {!inZoomMod && children}
      <LoadedImage {...zoomImageProps} />
    </div>
  );
};

type ModalButtonsProps = {
  actions: ModalActions;
  children: ReactNode;
};
const ModalButtons: FC<ModalButtonsProps> = ({ actions, children }) => {
  const { prev, next } = actions;
  return (
    <>
      <button onClick={prev} className="theme-btn rounded-circle p-4" disabled={!prev}>
        <LeftArrow size={30} />
      </button>
      {children}
      <button onClick={next} className="theme-btn rounded-circle p-4" disabled={!next}>
        <RightArrow size={30} />
      </button>
    </>
  );
};

type ModalProps = {
  image: ModalImage;
  actions: ModalActions;
  children?: ReactNode;
};

export const ImageModal: FC<ModalProps> = ({ image, actions, children }) => {
  const handleClickOutside = (e: any) => e.target === e.currentTarget && actions.close();

  return (
    <div
      data-test="image-modal"
      className="fixed left-0 top-0 z-[2000] h-screen w-screen bg-dark/60 px-40 dark:bg-dark/80"
      onClick={handleClickOutside}
    >
      <div
        className="absolute inset-0 m-auto flex max-w-6xl items-center justify-between px-3 py-10"
        onClick={handleClickOutside}
      >
        <ModalButtons actions={actions}>
          <ImageContainer image={image}>{children}</ImageContainer>
        </ModalButtons>
      </div>
    </div>
  );
};

export default ImageModal;
