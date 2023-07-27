import { FC, ReactNode, useRef, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { AiFillPlusCircle as PlusIcon } from 'react-icons/ai';
import { ResponseImage, UserAlbumThumbnail } from '@/types';
import { cn, getResizedImage } from '@/utils';
import { trpc } from '@/utils/trpc';
import { ErrorMessage } from '../Forms/FormComponents';

export const Placeholder: FC<{ itemsNumber?: number }> = ({ itemsNumber = 12 }) => {
  return (
    <>
      {new Array(itemsNumber).fill(null).map((_, index) => (
        <div key={index} className="aspect-[3/2] animate-pulse rounded-xl bg-neutral"></div>
      ))}
    </>
  );
};

type AlbumThumbnailProps = {
  thumbnail: UserAlbumThumbnail;
  className?: string;
};
export const AlbumThumbnail: FC<AlbumThumbnailProps> = ({ thumbnail, className }) => {
  const thumbnailImage = thumbnail.images.length ? thumbnail.images[0].src : undefined;
  return (
    <div className="group transition-colors hover:text-primary">
      <div
        className={cn(
          'transition-inherit relative aspect-[3/2] overflow-hidden rounded-xl border-2 border-dark group-hover:border-primary dark:border-white',
          {
            'flex items-center justify-center bg-neutral-400 dark:bg-dark/60': !thumbnailImage
          },
          className
        )}
      >
        {thumbnailImage ? (
          <Image
            src={getResizedImage(thumbnailImage, 520)}
            className="w-2/5 brightness-50 transition-all duration-300 group-hover:scale-125 dark:brightness-50"
            alt={`scatch ${thumbnail.name} album`}
            style={{ objectFit: 'cover' }}
            fill
          />
        ) : (
          <Image
            src="/mark.svg"
            width={250}
            height={250}
            className="w-2/5 brightness-0 dark:brightness-50"
            alt="scatch mark"
          />
        )}
      </div>
      <span className="mt-2 block w-full font-semibold">{thumbnail.name}</span>
    </div>
  );
};

type CreateNewAlbumProps = {
  userId: string;
  refetch: Function;
  className?: string;
};
export const CreateNewAlbum: FC<CreateNewAlbumProps> = ({ userId, refetch, className }) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [showNameModal, setShowNameModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  function closeModal(e: any) {
    const clickOutside = e.target === e.currentTarget;
    if (clickOutside) setShowNameModal(false);
  }

  const albumMutation = trpc.addNewAlbum.useMutation();

  const addNewAlbum = async () => {
    const name = nameInputRef.current!.value.trim().replace(/\s+/g, ' ');
    if (!name) return;
    if (/[^\w\s]/.test(name)) {
      setErrorMessage('No special characters!');
      return;
    }
    try {
      await albumMutation.mutateAsync({ name, userId });
    } catch (error: any) {
      setErrorMessage(error.message);
      return;
    }
    refetch();
    setShowNameModal(false);
  };

  return (
    <>
      <button
        title="Create new album"
        onClick={() => {
          setErrorMessage('');
          setShowNameModal(true);
        }}
        className={cn(
          'flex aspect-[3/2] items-center justify-center rounded-xl border-2 border-dashed border-neutral-600 object-cover font-semibold text-neutral-600 transition-colors hover:border-dark hover:text-dark dark:border-neutral-700 dark:text-neutral-700 hover:dark:border-white hover:dark:text-white',
          className
        )}
      >
        <PlusIcon size={65} />
      </button>
      {(showNameModal || albumMutation.isLoading) && (
        <div
          onClick={closeModal}
          className="fixed left-0 top-0 z-[2020] flex h-screen w-screen items-center bg-black/50 px-3 animate-in fade-in dark:bg-black/70"
        >
          <div className="m-auto w-[400px] rounded-xl bg-white p-5 shadow-xl dark:bg-neutral">
            <div className="mb-3 text-lg font-semibold">Create new album</div>
            <input
              type="text"
              ref={nameInputRef}
              onFocus={() => setErrorMessage('')}
              placeholder="Name.."
              className={cn('theme-input', { 'error': errorMessage })}
              autoComplete="off"
              required
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <button
              className="theme-btn mt-3 flex w-full items-center justify-center px-4 py-2 text-center"
              onClick={addNewAlbum}
            >
              {albumMutation.isLoading ? (
                <div className="loading loading-spinner w-6"></div>
              ) : (
                'Create'
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

type WithImageAndUserId = {
  userId: string;
  image: ResponseImage;
};

type AlbumGridLayoutProps = WithImageAndUserId & {
  refetch: Function;
  toggle: Function;
  thumbnails?: UserAlbumThumbnail[];
};
const AlbumGridLayout: FC<AlbumGridLayoutProps> = props => {
  const { userId, image, toggle, refetch, thumbnails } = props;
  const imageMutation = trpc.addNewImage.useMutation();

  const addNewImage = async (albumName: string) => {
    await imageMutation.mutateAsync({ userId, albumName, image });
    toggle();
  };

  return (
    <div className="relative" style={{ '--col-min-width': '200px' } as any}>
      <div
        className={cn('grid w-full grid-cols-fill items-start gap-2', {
          'pointer-events-none opacity-20': imageMutation.isLoading
        })}
      >
        {thumbnails ? (
          <>
            {thumbnails.map((thumbnail, index) => (
              <button key={index} onClick={async () => await addNewImage(thumbnail.name)}>
                <AlbumThumbnail thumbnail={thumbnail} />
              </button>
            ))}
            <CreateNewAlbum userId={userId} refetch={refetch} className="w-full" />
          </>
        ) : (
          <Placeholder itemsNumber={6} />
        )}
      </div>
      {imageMutation.isLoading && (
        <div className="loading loading-spinner absolute inset-0 m-auto w-16"></div>
      )}
    </div>
  );
};

type AlbumModalProps = WithImageAndUserId & {
  children: ReactNode;
  toggle: Function;
  show: boolean;
};
const AlbumModal: FC<AlbumModalProps> = ({ userId, image, toggle, show, children }) => {
  if (!show) return <>{children}</>;

  function handleClick(e: any) {
    const clickOutside = e.target === e.currentTarget;
    if (clickOutside) toggle();
  }

  const { data, refetch } = trpc.getAllAlbums.useQuery(userId);
  const layoutProps = { userId, image, toggle, thumbnails: data };

  return (
    <>
      {children}
      {createPortal(
        <div
          data-test="album-modal"
          className="fixed left-0 top-0 z-[2000] flex h-screen w-screen items-center bg-black/50 px-3 animate-in fade-in"
          onClick={handleClick}
        >
          <div className="m-auto w-full max-w-3xl rounded-xl bg-white p-4 text-center shadow-2xl dark:bg-neutral">
            <div className="mb-4 text-2xl font-semibold sm:text-4xl">Choose your album</div>
            <div className="h-[550px] overflow-auto rounded-inherit bg-neutral p-4 dark:bg-base-100 sm:h-[400px]">
              <AlbumGridLayout {...layoutProps} refetch={refetch} />
            </div>
          </div>
        </div>,
        document.getElementById('layout')!
      )}
    </>
  );
};

export default AlbumModal;
