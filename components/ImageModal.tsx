import Image from 'next/image';
import { CSSProperties, FC, ReactNode, useState } from 'react';
import { ContainerRef, ModalActions, ModalImage } from '@/types';
import {
  IoIosArrowDroprightCircle as RightArrow,
  IoIosArrowDropleftCircle as LeftArrow
} from 'react-icons/io';

type LoadedImageProps = {
  image: ModalImage;
  inZoomMod: boolean;
  toggleZoom: () => void;
  imageContainerRef: ContainerRef;
};

const LoadedImage: FC<LoadedImageProps> = props => {
  const { image, inZoomMod, imageContainerRef, toggleZoom } = props;

  const { src, width, height } = image;

  function getImageElement() {
    const container = imageContainerRef.current!;
    const image = container.firstElementChild as HTMLImageElement;
    return image;
  }

  function handleMouseMove(event: any) {
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
  }

  function handleMouseClick() {
    if (inZoomMod) getImageElement().style.transform = 'none';
    toggleZoom();
  }

  const isPortrait = height > width;
  const style: CSSProperties | undefined = inZoomMod
    ? {
        scale: isPortrait ? '1.1' : '1.65',
        transformOrigin: 'center',
        transition: 'all 100ms ease-out'
      }
    : undefined;

  const imageProps = { width, height, src, style };

  return (
    <div
      ref={imageContainerRef}
      className="flex cursor-zoom-in items-center"
      onMouseMove={handleMouseMove}
      onClick={handleMouseClick}
    >
      <Image {...imageProps} className="bg-image" alt="scatch image" />
    </div>
  );
};

type ImageContainerProps = {
  image: ModalImage;
  containerRef: ContainerRef;
  children?: ReactNode;
};

const ImageContainer: FC<ImageContainerProps> = props => {
  const { image, containerRef, children } = props;
  const [inZoomMod, setInZoomMod] = useState<boolean>(false);
  function toggleZoom() {
    setInZoomMod(!inZoomMod);
  }

  const { width, height } = image;
  const aspectRatio = width + '/' + height;

  const zoomImageProps = {
    image,
    inZoomMod,
    toggleZoom,
    imageContainerRef: containerRef
  };

  return (
    <div
      className={
        inZoomMod
          ? 'flex h-full w-full items-center justify-center overflow-hidden'
          : 'max-h-[80vh]'
      }
      style={{ aspectRatio }}
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
      <button onClick={prev} className="modal-arrow" disabled={!prev}>
        <LeftArrow />
      </button>
      {children}
      <button onClick={next} className="modal-arrow" disabled={!next}>
        <RightArrow />
      </button>
    </>
  );
};

type ModalProps = {
  image: ModalImage;
  actions: ModalActions;
  containerRef: ContainerRef;
  children?: ReactNode;
};

export const ImageModal: FC<ModalProps> = props => {
  const { image, actions, containerRef, children } = props;
  const { close } = actions;

  function handleClick(e: any) {
    const clickOutside = e.target === e.currentTarget;
    if (clickOutside) close();
  }

  const imageContainerProps = { image, containerRef };

  return (
    <div
      data-test="image-modal"
      className="fixed left-0 top-0 z-[2000] h-screen w-screen bg-dark/60 px-40 dark:bg-dark/80"
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 m-auto flex max-w-6xl items-center justify-between px-3 py-10"
        onClick={handleClick}
      >
        <ModalButtons actions={actions}>
          <ImageContainer {...imageContainerProps}>{children}</ImageContainer>
        </ModalButtons>
      </div>
    </div>
  );
};
export default ImageModal;
