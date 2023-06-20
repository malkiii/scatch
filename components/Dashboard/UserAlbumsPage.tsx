import { cn } from '@/utils';
import { trpc } from '@/utils/trpc';
import { DashboardPageProps } from '.';
import { FC, useRef, useState } from 'react';
import { UserAlbumThumbnail } from '@/types';
import { SpinnerAnimation } from '../Loading';
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillPlusCircle as PlusIcon } from 'react-icons/ai';
import Image from 'next/image';

type AlbumThumbnailProps = {
  className?: string;
  thumbnail: UserAlbumThumbnail;
};
export const AlbumThumbnail: FC<AlbumThumbnailProps> = ({ thumbnail, className }) => {
  const thumbnailImage = thumbnail.images.length ? `url(${thumbnail.images[0].src})` : undefined;
  return (
    <button className="group transition-colors hover:text-theme">
      <div
        style={{ backgroundImage: thumbnailImage }}
        className={cn(
          'transition-inherit aspect-[3/2] rounded-xl border-2 border-dark bg-center bg-no-repeat object-cover group-hover:border-theme dark:border-white',
          {
            'flex items-center justify-center bg-neutral-300 dark:bg-dark/60': !thumbnailImage
          },
          className
        )}
      >
        {!thumbnailImage && (
          <Image
            width={250}
            height={250}
            src="/mark.svg"
            alt="scatch mark"
            className="w-2/5 brightness-50 dark:brightness-50"
          />
        )}
      </div>
      <span className="mt-2 block w-full font-semibold">{thumbnail.name}</span>
    </button>
  );
};

type CreateNewAlbumProps = {
  userId: string;
  refech: Function;
  className?: string;
};
export const CreateNewAlbum: FC<CreateNewAlbumProps> = ({ userId, refech, className }) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [showNameModal, setShowNameModal] = useState<boolean>(false);

  function closeModal(e: any) {
    const clickOutside = e.target === e.currentTarget;
    if (clickOutside) setShowNameModal(false);
  }

  const albumMutation = trpc.addNewAlbum.useMutation();

  const addNewAlbum = async () => {
    const name = nameInputRef.current!.value;
    if (name) {
      await albumMutation.mutateAsync({ name, userId });
      refech();
    }
    setShowNameModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowNameModal(true)}
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
                placeholder="Name.."
                className="credential-input"
                autoComplete="off"
                required
              />
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

const UserAlbumsPage: FC<{ user: DashboardPageProps['user'] }> = ({ user }) => {
  return <div className="w-full p-4 text-4xl">Albums</div>;
};
export default UserAlbumsPage;
