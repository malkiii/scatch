import { FC } from 'react';
import { DashboardPageProps } from '.';

const UserAlbumsPage: FC<{ user: DashboardPageProps['user'] }> = ({ user }) => {
  return <div className="w-full p-4 text-4xl">Albums</div>;
};
export default UserAlbumsPage;
