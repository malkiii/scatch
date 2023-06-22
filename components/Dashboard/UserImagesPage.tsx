import { FC, useState } from 'react';
import { trpc } from '@/utils/trpc';
import { UserPageProps } from '.';
import ImageGridLayout from '../ImageGridLayout';

const UserImagesPage: FC<UserPageProps> = ({ user, pathname }) => {
  const [currentPathname] = useState<string>(pathname);
  const { data } = trpc.getAllImages.useQuery(user.id);

  return (
    <div className="main-container my-5">
      <ImageGridLayout images={data || []} pagePath={currentPathname} />
    </div>
  );
};
export default UserImagesPage;
