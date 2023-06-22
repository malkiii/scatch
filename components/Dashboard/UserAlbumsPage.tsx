import { FC } from 'react';
import Link from 'next/link';
import { trpc } from '@/utils/trpc';
import { UserPageProps } from '.';
import { AlbumThumbnail, CreateNewAlbum } from './AlbumModal';

const UserAlbumsPage: FC<UserPageProps> = ({ user }) => {
  const { id: userId } = user;
  const { data: thumbnails, refetch, isLoading } = trpc.getAllAlbums.useQuery(userId);

  return (
    <div
      style={{ '--col-min-width': '200px' } as any}
      className="main-container grid w-full grid-cols-fill items-start gap-2"
    >
      {thumbnails?.map((thumbnail, index) => (
        <Link key={index} href="/">
          <AlbumThumbnail thumbnail={thumbnail} />
        </Link>
      ))}
      <CreateNewAlbum userId={userId} refetch={refetch} className="w-full" />
    </div>
  );
};
export default UserAlbumsPage;
