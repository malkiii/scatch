import { FC } from 'react';
import { WithRouterProps } from 'next/dist/client/with-router';
import Head from 'next/head';
import type { User } from 'next-auth';
import UserAlbumsPage from './UserAlbumsPage';
import UserFavoritePage from './UserFavoritePage';
import UserImagesPage from './UserImagesPage';
import UserStatsPage from './UserStatsPage';

export const dashboardPageRoutes = ['images', 'albums', 'favorite', 'stats'] as const;
export type DashboardPageRoute = (typeof dashboardPageRoutes)[number];

export type UserPageProps = {
  user: User;
  pathname: string;
};

export type DashboardPageProps = {
  user: User;
  initialPageRoute: DashboardPageRoute | null;
};

type DashboardPagesProps = DashboardPageProps &
  WithRouterProps & {
    currentPageRoute: DashboardPageProps['initialPageRoute'];
  };
const DashboardPages: FC<DashboardPagesProps> = props => {
  const { user, initialPageRoute, currentPageRoute, router } = props;
  const pageProps = { user, pathname: router.asPath };

  function getPageTitle(name: string) {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    return `${capitalizedName} | Scatch`;
  }

  function getDashboardPage() {
    switch (currentPageRoute || initialPageRoute || 'images') {
      case 'images':
        return <UserImagesPage {...pageProps} />;
      case 'albums':
        return <UserAlbumsPage {...pageProps} />;
      case 'favorite':
        return <UserFavoritePage {...pageProps} />;
      case 'stats':
        return <UserStatsPage {...pageProps} />;
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle(currentPageRoute || user.name)}</title>
      </Head>
      {getDashboardPage()}
    </>
  );
};

export default DashboardPages;
