import { FC } from 'react';
import { User } from 'next-auth';
import UserImagesPage from './UserImagesPage';
import UserAlbumsPage from './UserAlbumsPage';
import UserFavoritePage from './UserFavoritePage';
import UserStatsPage from './UserStatsPage';
import { WithRouterProps } from 'next/dist/client/with-router';
import Head from 'next/head';

function getPageTitle(name: string) {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  return `${capitalizedName} | Scatch`;
}

export type DashboardPageRoute = 'images' | 'albums' | 'favorite' | 'stats';
export type DashboardPageProps = {
  user: User;
  initialPageRoute: DashboardPageRoute | null;
};
const DashboardPages: FC<DashboardPageProps & WithRouterProps> = props => {
  const { user, initialPageRoute, router } = props;
  const route: DashboardPageRoute = (router.query.route as any) || initialPageRoute || 'images';

  function getDashboardPage() {
    switch (route) {
      case 'images':
        return <UserImagesPage user={user} />;
      case 'albums':
        return <UserAlbumsPage user={user} />;
      case 'favorite':
        return <UserFavoritePage user={user} />;
      case 'stats':
        return <UserStatsPage user={user} />;
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle(route || (user.name as string))}</title>
      </Head>
      {getDashboardPage()}
    </>
  );
};
export default DashboardPages;
