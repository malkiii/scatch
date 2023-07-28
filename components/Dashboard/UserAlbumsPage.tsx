import { FC } from 'react';
import Link from 'next/link';
import { trpc } from '@/utils/trpc';
import { UserPageProps } from '.';
import { AlbumThumbnail, CreateNewAlbum, Placeholder } from './AlbumModal';

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
