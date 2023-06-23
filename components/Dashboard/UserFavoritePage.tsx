import { FC, useState } from 'react';
import { trpc } from '@/utils/trpc';
import { UserPageProps } from '.';
import ImageGridLayout from '../ImageGridLayout';
import { NoImages } from './UserImagesPage';

const UserFavoritePage: FC<UserPageProps> = ({ user, pathname }) => {
  const [currentPathname] = useState<string>(pathname);
  const { data, isLoading } = trpc.getAllFavoriteImages.useQuery(user.id);

  const hasImages = isLoading || data?.length;

  if (!hasImages) return <NoImages />;

  return (
    <div className="main-container my-5">
      <ImageGridLayout images={data || []} pagePath={currentPathname} />
    </div>
  );
};
export default UserFavoritePage;
