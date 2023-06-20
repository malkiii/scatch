import Link from 'next/link';
import { cn } from '@/utils';
import { useRouter } from 'next/router';
import { ResponseImage } from '@/types';
import { useSession } from 'next-auth/react';
import { FC, ReactNode, useState } from 'react';
import { useAlbumModal } from '@/hooks/useAlbumModal';
import AlbumModal from '@/components/Dashboard/AlbumModal';
import { CgMathPlus, CgSoftwareDownload } from 'react-icons/cg';
import { FaRegHeart as FavoriteOutlineIcon, FaHeart as FavoriteSolidIcon } from 'react-icons/fa';

const logoSize = 25;
function cancelEvents(e: any) {
  e.stopPropagation();
}

type WithImage = {
  image: ResponseImage;
};
type WithImageAndUserId = WithImage & {
  userId?: string;
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

type SaveButtonPros = {
  toggleAlbumModal: Function;
  userId: WithImageAndUserId['userId'];
} & WithClassName;
export const SaveButton: FC<SaveButtonPros> = ({ userId, toggleAlbumModal, className }) => {
  const router = useRouter();
  async function handleClick(e: any) {
    cancelEvents(e);
    e.preventDefault();
    if (!userId) return router.push('/login');
    toggleAlbumModal();
  }
  return (
    <button
      title="Save this image in your album"
      className={cn('image-layer-btn', className)}
      onClick={handleClick}
    >
      <CgMathPlus size={logoSize} />
    </button>
  );
};

type FavoriteButtonProps = WithImageAndUserId & WithClassName;
export const FavoriteButton: FC<FavoriteButtonProps> = ({ image, userId, className }) => {
  function handleClick(e: any) {
    cancelEvents(e);
    // make it favorite
  }
  return (
    <a href="" className={cn('image-layer-btn', className)} onClick={handleClick}>
      <FavoriteOutlineIcon size={logoSize} />
    </a>
  );
};

type DownloadButtonPops = {
  content: 'text' | 'icon';
} & WithImageAndUserId &
  WithClassName;

export const DownloadButton: FC<DownloadButtonPops> = props => {
  const { image, userId, content, className } = props;
  const downloadURL = `${image.src}?cs=srgb&dl=scatch-${image.id}.jpg&fm=jpg`;

  return (
    <a
      href={downloadURL}
      title="Download the image"
      className={cn('image-layer-btn', className)}
      onClick={cancelEvents}
    >
      {content == 'icon' ? <CgSoftwareDownload size={logoSize} /> : 'Download'}
    </a>
  );
};

type SubLayerProps = WithImageAndUserId &
  WithChildren & {
    linkProps?: LayerProps['linkProps'];
    toggleAlbumModal: Function;
  };
const InnerImageLayer: FC<SubLayerProps> = props => {
  const { image, userId, toggleAlbumModal, linkProps, children } = props;
  const buttonProps = { userId, image, toggleAlbumModal };
  return (
    <Link {...linkProps} data-test="modal-link" className="relative">
      {children}
      <div className="image-layout-cover">
        <SaveButton
          {...buttonProps}
          toggleAlbumModal={toggleAlbumModal}
          className="cs-fixed absolute right-5 top-5"
        />
        <div className="absolute bottom-0 flex w-full items-center justify-between p-5">
          <PhotographerName name={image.photographer} className="text-white" />
          <DownloadButton {...buttonProps} content="icon" className="cs-fixed" />
        </div>
      </div>
    </Link>
  );
};

const OuterImageLayer: FC<SubLayerProps> = ({ image, userId, toggleAlbumModal, children }) => {
  const buttonProps = { userId, image, toggleAlbumModal };
  return (
    <div key={image.id}>
      <PhotographerName name={image.photographer} className="block py-3 pl-1 text-white" />
      {children}
      <div className="flex w-full items-center justify-between px-2 pt-3">
        <SaveButton {...buttonProps} className="cs-change" />
        <DownloadButton {...buttonProps} content="text" className="cs-change" />
      </div>
    </div>
  );
};

type LayerProps = {
  linkProps: any;
  hasMobileSize: boolean;
} & WithImageAndUserId &
  WithChildren;
export const ImageLayer: FC<LayerProps> = props => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const { image, linkProps, children } = props;
  const { showAlbumModal, albumModalProps, toggleAlbumModal } = useAlbumModal(image, userId!);

  const layerProps = { userId, image, linkProps, toggleAlbumModal, children };
  return (
    <AlbumModal show={showAlbumModal} toggle={toggleAlbumModal} {...albumModalProps}>
      {props.hasMobileSize ? (
        <OuterImageLayer {...layerProps} />
      ) : (
        <InnerImageLayer {...layerProps} />
      )}
    </AlbumModal>
  );
};
