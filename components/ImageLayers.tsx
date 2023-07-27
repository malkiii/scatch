import { FC, ReactNode, useState } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { Image as UserImage } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { CgSoftwareDownload as DownloadIcon, CgMathPlus as PlusIcon } from 'react-icons/cg';
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
      className={cn('p-2', className || 'theme-btn')}
      onClick={handleClick}
    >
      <PlusIcon size={logoSize} />
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
      className={cn('p-2', className || 'theme-btn')}
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

  const { mutate, isLoading } = trpc.saveActivity.useMutation();
  const handleClick = async (e: any) => {
    cancelEvents(e);
    if (!userId || isLoading) return;
    mutate({ userId, type: 'DOWNLOAD' });
  };

  return (
    <a
      href={downloadURL}
      title="Download the image"
      className={cn('p-2', className || 'theme-btn')}
      onClick={handleClick}
    >
      {content == 'icon' ? <DownloadIcon size={logoSize} /> : 'Download'}
    </a>
  );
};

type NestedLayerProps = {
  linkProps: LayerProps['linkProps'];
  toggleAlbumModal?: Function;
} & WithImageAndUserId &
  WithChildren;

const InnerImageLayer: FC<NestedLayerProps> = props => {
  const { image, userId, toggleAlbumModal, linkProps, children } = props;

  const btnProps = { userId, image, toggleAlbumModal: toggleAlbumModal! };
  const btnClassName =
    'btn btn-outline text-white border-white hover:border-white hover:text-black hover:bg-white border-2';
  const title = isUserImage(image) ? image.albumName : image.photographer;

  return (
    <Link {...linkProps} data-test="modal-link" className="relative">
      {children}
      <div className="before:focus-gradient absolute inset-0 opacity-0 transition-opacity before:pointer-events-none before:absolute before:inset-0 hover:opacity-100">
        {isUserImage(image) ? (
          <FavoriteButton {...btnProps} className={cn(btnClassName, 'absolute right-5 top-5')} />
        ) : (
          <SaveButton {...btnProps} className={cn(btnClassName, 'absolute right-5 top-5')} />
        )}
        <div className="absolute bottom-0 flex w-full items-center justify-between p-5">
          <ImageTitle title={title} className="text-white" />
          <DownloadButton content="icon" {...btnProps} className={btnClassName} />
        </div>
      </div>
    </Link>
  );
};

const OuterImageLayer: FC<NestedLayerProps> = ({ image, userId, toggleAlbumModal, children }) => {
  const buttonProps = { userId, image, toggleAlbumModal: toggleAlbumModal! };
  const title = isUserImage(image) ? image.albumName : image.photographer;

  return (
    <div key={image.id}>
      <ImageTitle title={title} className="block py-3 pl-1 text-white" />
      {children}
      <div className="flex w-full items-center justify-between px-2 pt-3">
        {isUserImage(image) ? <FavoriteButton {...buttonProps} /> : <SaveButton {...buttonProps} />}
        <DownloadButton content="text" {...buttonProps} />
      </div>
    </div>
  );
};

type LayerProps = {
  linkProps: LinkProps;
  hasMobileSize: boolean;
} & WithImageAndUserId &
  WithChildren;

export const ImageLayer: FC<LayerProps> = props => {
  const { image, linkProps, children } = props;

  const { data: session } = useSession();
  const userId = session?.user.id;

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
