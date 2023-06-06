import { FC } from 'react';
import { DashboardPageProps } from '.';

const UserStatsPage: FC<{ user: DashboardPageProps['user'] }> = ({ user }) => {
  return <div className="w-full p-4 text-4xl">Stats</div>;
};
export default UserStatsPage;
