import { FC } from 'react';
import { DashboardPageProps } from '.';

const UserFavoritePage: FC<{ user: DashboardPageProps['user'] }> = ({ user }) => {
  return <div className="w-full p-4 text-4xl">Favorite</div>;
};
export default UserFavoritePage;
