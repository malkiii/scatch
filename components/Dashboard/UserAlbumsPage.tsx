import { FC } from 'react';
import Link from 'next/link';
import { trpc } from '@/utils/trpc';
import { UserPageProps } from '.';
import { AlbumThumbnail, CreateNewAlbum } from './AlbumModal';

const Placeholder: FC = () => {
  return (
    <>
      {new Array(12).fill(null).map((_, index) => (
        <div key={index} className="bg-cs-change aspect-[3/2] animate-pulse rounded-xl"></div>
      ))}
    </>
  );
};

const UserAlbumsPage: FC<UserPageProps> = ({ user }) => {
  const { id: userId } = user;
  const { data: thumbnails, refetch, isLoading } = trpc.getAllAlbums.useQuery(userId);

  return (
    <div
      style={{ '--col-min-width': '280px' } as any}
      className="main-container my-5 grid w-full grid-cols-fill items-start gap-5 px-5"
    >
      {!isLoading && (
        <>
          {thumbnails?.map((thumbnail, index) => (
            <Link
              key={index}
              className="text-center"
              href={`/albums/${thumbnail.name.replace(' ', '-')}`}
            >
              <AlbumThumbnail thumbnail={thumbnail} />
            </Link>
          ))}
          <CreateNewAlbum userId={userId} refetch={refetch} className="w-full" />
        </>
      )}
      {isLoading && <Placeholder />}
    </div>
  );
};
export default UserAlbumsPage;
