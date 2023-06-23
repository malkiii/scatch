import { FC, ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Image as UserImage } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { CgMathPlus, CgSoftwareDownload } from 'react-icons/cg';
import { FaRegHeart as FavoriteOutlineIcon, FaHeart as FavoriteSolidIcon } from 'react-icons/fa';
import { ResponseImage } from '@/types';
import { cn } from '@/utils';
import { trpc } from '@/utils/trpc';
import { useAlbumModal } from '@/hooks/useAlbumModal';
import AlbumModal from '@/components/Dashboard/AlbumModal';

const logoSize = 25;
function cancelEvents(e: any) {
  e.stopPropagation();
}

function isUserImage(image: any): image is UserImage {
  return 'albumName' in image;
}

type WithImage = {
  image: ResponseImage | UserImage;
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

type ImageTitleProps = {
  title: string;
} & WithClassName;

export const ImageTitle: FC<ImageTitleProps> = ({ title, className }) => {
  return <strong className={cn('font-normal', className)}>{title}</strong>;
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
  const { id, isFavorite } = image as UserImage;
  const [favorite, setFavorite] = useState<boolean>(isFavorite);

  const { mutateAsync, isLoading } = trpc.setFavoriteImage.useMutation();
  const setAsFavoriteImage = async (e: any) => {
    cancelEvents(e);
    e.preventDefault();
    if (isLoading) return;

    const { isFavorite } = await mutateAsync({ id, userId: userId!, isFavorite: !favorite });
    setFavorite(isFavorite);
  };

  return (
    <button
      title={favorite ? 'Remove from my favorite images' : 'Add to my favorite images'}
      className={cn('image-layer-btn', className)}
      onClick={setAsFavoriteImage}
    >
      {favorite && <FavoriteSolidIcon size={logoSize} />}
      {!favorite && <FavoriteOutlineIcon size={logoSize} />}
    </button>
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
    toggleAlbumModal?: Function;
  };
const InnerImageLayer: FC<SubLayerProps> = props => {
  const { image, userId, toggleAlbumModal, linkProps, children } = props;
  const buttonProps = { userId, image, toggleAlbumModal: toggleAlbumModal! };
  const buttonClassName = 'cs-fixed absolute right-5 top-5';
  const title = isUserImage(image) ? image.albumName : image.photographer;
  return (
    <Link {...linkProps} data-test="modal-link" className="relative">
      {children}
      <div className="image-layout-cover">
        {isUserImage(image) ? (
          <FavoriteButton {...buttonProps} className={buttonClassName} />
        ) : (
          <SaveButton {...buttonProps} className={buttonClassName} />
        )}
        <div className="absolute bottom-0 flex w-full items-center justify-between p-5">
          <ImageTitle title={title} className="text-white" />
          <DownloadButton {...buttonProps} content="icon" className="cs-fixed" />
        </div>
      </div>
    </Link>
  );
};

const OuterImageLayer: FC<SubLayerProps> = ({ image, userId, toggleAlbumModal, children }) => {
  const buttonProps = { userId, image, toggleAlbumModal: toggleAlbumModal! };
  const title = isUserImage(image) ? image.albumName : image.photographer;
  const buttonClassName = 'cs-change';
  return (
    <div key={image.id}>
      <ImageTitle title={title} className="block py-3 pl-1 text-white" />
      {children}
      <div className="flex w-full items-center justify-between px-2 pt-3">
        {isUserImage(image) ? (
          <FavoriteButton {...buttonProps} className={buttonClassName} />
        ) : (
          <SaveButton {...buttonProps} className={buttonClassName} />
        )}
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

  const layerProps = { userId, image, linkProps, children };
  const imageLayer = (layerProps: any) =>
    props.hasMobileSize ? <OuterImageLayer {...layerProps} /> : <InnerImageLayer {...layerProps} />;

  if ('albumName' in image) return imageLayer(layerProps);

  const { showAlbumModal, albumModalProps, toggleAlbumModal } = useAlbumModal(image, userId!);

  return (
    <AlbumModal show={showAlbumModal} toggle={toggleAlbumModal} {...albumModalProps}>
      {imageLayer({ ...layerProps, toggleAlbumModal })}
    </AlbumModal>
  );
};
