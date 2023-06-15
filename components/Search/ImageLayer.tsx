import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { ResponseImage } from '@/types';
import { CgMathPlus, CgSoftwareDownload } from 'react-icons/cg';
import { FaRegHeart as FavoriteOutlineIcon, FaHeart as FavoriteSolidIcon } from 'react-icons/fa';
import { cn } from '@/utils';

const logoSize = 25;
function cancelEvents(e: any) {
  e.stopPropagation();
}

type WithImage = {
  image: ResponseImage;
};
type WithChildren = {
  children: ReactNode;
};
type WithClassName = {
  className?: string;
};

type PhotographerNameProps = {
  name: string;
} & WithClassName;

export const PhotographerName: FC<PhotographerNameProps> = props => {
  const { name, className } = props;
  const styleClasses = className || '';

  return <strong className={cn('font-normal', styleClasses)}>By {name}</strong>;
};

type SaveButtonPros = WithClassName;
export const SaveButton: FC<SaveButtonPros> = props => {
  function handleClick(e: any) {
    cancelEvents(e);
    // add it to an album
  }
  return (
    <a href="" className={cn('image-layer-btn', props.className)} onClick={handleClick}>
      <CgMathPlus size={logoSize} />
    </a>
  );
};

type FavoriteButtonProps = WithClassName;
export const FavoriteButton: FC<FavoriteButtonProps> = props => {
  function handleClick(e: any) {
    cancelEvents(e);
    // make it favorite
  }
  return (
    <a href="" className={cn('image-layer-btn', props.className)} onClick={handleClick}>
      <FavoriteOutlineIcon size={logoSize} />
    </a>
  );
};

type DownloadButtonPops = {
  content: 'text' | 'icon';
} & WithImage &
  WithClassName;

export const DownloadButton: FC<DownloadButtonPops> = props => {
  const { image, content, className } = props;
  const downloadURL = `${image.src}?cs=srgb&dl=scatch-${image.id}.jpg&fm=jpg`;

  return (
    <a href={downloadURL} className={cn('image-layer-btn', className)} onClick={cancelEvents}>
      {content == 'icon' ? <CgSoftwareDownload size={logoSize} /> : 'Download'}
    </a>
  );
};

type LayerProps = {
  linkProps: any;
  hasMobileSize: boolean;
} & WithImage &
  WithChildren;

const InnerImageLayer: FC<LayerProps> = ({ image, linkProps, children }) => {
  return (
    <Link {...linkProps} data-test="modal-link" className="relative">
      {children}
      <div className="image-layout-cover">
        <SaveButton className="cs-fixed absolute right-5 top-5" />
        <div className="absolute bottom-0 flex w-full items-center justify-between p-5">
          <PhotographerName name={image.photographer} className="text-white" />
          <DownloadButton image={image} content="icon" className="cs-fixed" />
        </div>
      </div>
    </Link>
  );
};

const OuterImageLayer: FC<LayerProps> = ({ image, children }) => {
  return (
    <div key={image.id}>
      <PhotographerName name={image.photographer} className="block py-3 pl-1 text-white" />
      {children}
      <div className="flex w-full items-center justify-between px-2 pt-3">
        <SaveButton className="cs-change" />
        <DownloadButton image={image} content="text" className="cs-change" />
      </div>
    </div>
  );
};

export const ImageLayer: FC<LayerProps> = props => {
  if (props.hasMobileSize) return <OuterImageLayer {...props} />;
  return <InnerImageLayer {...props} />;
};
