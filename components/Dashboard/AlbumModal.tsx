import { FC, ReactNode, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { AiFillPlusCircle as PlusIcon } from 'react-icons/ai';
import { ResponseImage, UserAlbumThumbnail } from '@/types';
import { cn, getResizedImage } from '@/utils';
import { trpc } from '@/utils/trpc';
import { ErrorMessage } from '../Forms/FormItems';
import { PulseAnimation, SpinnerAnimation } from '../Loading';

type AlbumThumbnailProps = {
  thumbnail: UserAlbumThumbnail;
  className?: string;
};
export const AlbumThumbnail: FC<AlbumThumbnailProps> = ({ thumbnail, className }) => {
  const thumbnailImage = thumbnail.images.length ? thumbnail.images[0].src : undefined;
  return (
    <div className="group transition-colors hover:text-theme">
      <div
        className={cn(
          'transition-inherit relative aspect-[3/2] overflow-hidden rounded-xl border-2 border-dark group-hover:border-theme dark:border-white',
          {
            'flex items-center justify-center bg-neutral-300 dark:bg-dark/60': !thumbnailImage
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
            className="w-2/5 brightness-50 dark:brightness-50"
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
          'flex aspect-[3/2] items-center justify-center rounded-xl border-2 border-dashed border-neutral-500 object-cover font-semibold text-neutral-500 transition-colors hover:border-dark hover:text-dark dark:border-neutral-700 dark:text-neutral-700 hover:dark:border-white hover:dark:text-white',
          className
        )}
      >
        <PlusIcon size={65} />
      </button>
      <AnimatePresence>
        {(showNameModal || albumMutation.isLoading) && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'tween', duration: 0.1 }}
            onClick={closeModal}
            className="fixed left-0 top-0 z-[2020] flex h-screen w-screen items-center bg-dark/60 px-3 opacity-0 dark:bg-dark/80"
          >
            <div className="bg-cs-change m-auto w-[400px] rounded-xl p-5 shadow-xl">
              <div className="mb-3">Create album</div>
              <input
                type="text"
                ref={nameInputRef}
                onFocus={() => setErrorMessage('')}
                placeholder="Name.."
                className={cn('credential-input', { 'error': errorMessage })}
                autoComplete="off"
                required
              />
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              <button
                className="theme-btn mt-3 flex w-full items-center justify-center px-4 py-2 text-center"
                onClick={addNewAlbum}
              >
                {albumMutation.isLoading ? <SpinnerAnimation size={24} /> : 'Create'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
    <div
      style={{ '--col-min-width': '200px' } as any}
      className={cn('grid w-full grid-cols-fill items-start gap-2', {
        'pointer-events-none opacity-20': imageMutation.isLoading
      })}
    >
      {thumbnails?.map((thumbnail, index) => (
        <button key={index} onClick={async () => await addNewImage(thumbnail.name)}>
          <AlbumThumbnail thumbnail={thumbnail} />
        </button>
      ))}
      <CreateNewAlbum userId={userId} refetch={refetch} className="w-full" />
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

  const { data, refetch, isLoading } = trpc.getAllAlbums.useQuery(userId);
  const layoutProps = { userId, image, toggle, thumbnails: data };

  return (
    <>
      {children}
      {createPortal(
        <div
          data-test="image-modal"
          className="fixed left-0 top-0 z-[2000] flex h-screen w-screen items-center bg-dark/60 px-3 dark:bg-dark/80"
          onClick={handleClick}
        >
          <div className="bg-cs-change m-auto w-full max-w-3xl rounded-xl p-4 text-center shadow-2xl">
            <div className="mb-3 text-2xl font-semibold sm:text-4xl">Choose your album</div>
            {isLoading && <PulseAnimation />}
            {!isLoading && (
              <div className="h-[550px] overflow-auto rounded-inherit bg-neutral-950 p-4 sm:h-[400px]">
                <AlbumGridLayout {...layoutProps} refetch={refetch} />
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default AlbumModal;
