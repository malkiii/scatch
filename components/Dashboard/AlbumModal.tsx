import { trpc } from '@/utils/trpc';
import { FC, ReactNode } from 'react';
import { ResponseImage, UserAlbumThumbnail } from '@/types';
import { AlbumThumbnail, CreateNewAlbum } from './UserAlbumsPage';
import { PulseAnimation } from '../Loading';

type AlbumGridLayoutProps = {
  userId: string;
  refech: Function;
  thumbnails?: UserAlbumThumbnail[];
};
const AlbumGridLayout: FC<AlbumGridLayoutProps> = ({ userId, refech, thumbnails }) => {
  return (
    <div className="grid h-[400px] grid-cols-album-modal items-start gap-2 overflow-auto p-4">
      {thumbnails?.map((thumbnail, index) => (
        <AlbumThumbnail key={index} thumbnail={thumbnail} />
      ))}
      <CreateNewAlbum userId={userId} refech={refech} className="w-full" />
    </div>
  );
};

type AlbumModalProps = {
  userId: string;
  image: ResponseImage;
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

  return (
    <>
      {children}
      <div
        data-test="image-modal"
        className="fixed left-0 top-0 z-[2000] flex h-screen w-screen items-center bg-dark/60 px-3 dark:bg-dark/80"
        onClick={handleClick}
      >
        <div className="bg-cs-change m-auto w-full max-w-3xl rounded-xl p-7 text-center shadow-2xl">
          <div className="mb-3 text-4xl font-semibold">Choose your album</div>
          {isLoading && <PulseAnimation />}
          {!isLoading && <AlbumGridLayout userId={userId} refech={refetch} thumbnails={data} />}
        </div>
      </div>
    </>
  );
};

export default AlbumModal;
