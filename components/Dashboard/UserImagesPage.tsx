import { FC, useState } from 'react';
import TypeIt from 'typeit-react';
import { useUserImages } from '@/hooks/dashboard';
import { UserPageProps } from '.';
import ImageGridLayout from '../ImageGridLayout';
import { PulseAnimation } from '../Loading';

export const NoImages: FC = () => {
  return (
    <div className="text-4xl font-semibold mt-20 px-4 text-center sm:mt-32">
      <TypeIt
        options={{ waitUntilVisible: true }}
        getBeforeInit={instance => {
          // text -> There is no images.
          instance
            .type('Thre is ')
            .move(-6)
            .type('e')
            .move(null, { to: 'END' })
            .type('no imega')
            .pause(200)
            .delete(3)
            .type('ages.');
          return instance;
        }}
      />
    </div>
  );
};

const UserImagesPage: FC<UserPageProps> = ({ user, pathname }) => {
  const [currentPathname] = useState<string>(pathname);
  const { images, hasImages, hasMoreImages } = useUserImages(user.id);

  if (!hasImages) return <NoImages />;

  return (
    <div className="main-container my-5">
      <ImageGridLayout images={images} pagePath={currentPathname} />
      {hasMoreImages && <PulseAnimation />}
    </div>
  );
};
export default UserImagesPage;
