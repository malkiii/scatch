import { FC, useState } from 'react';
import { useUserImages } from '@/hooks/dashboard';
import { UserPageProps } from '.';
import ImageGridLayout from '../ImageGridLayout';
import { NoImages } from './UserImagesPage';

const UserFavoritePage: FC<UserPageProps> = ({ user, pathname }) => {
  const [currentPathname] = useState<string>(pathname);
  const { images, hasImages, hasMoreImages } = useUserImages(user.id, undefined, true);

  if (!hasImages) return <NoImages />;

  return (
    <div className="main-container my-5">
      <ImageGridLayout images={images} pagePath={currentPathname} />
      {hasMoreImages && <div className="loading loading-dots mx-auto block w-20 opacity-50"></div>}
    </div>
  );
};

export default UserFavoritePage;
