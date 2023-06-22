import { FC } from 'react';
import { UserPageProps } from '.';

const UserStatsPage: FC<UserPageProps> = ({ user }) => {
  return <div className="w-full p-4 text-4xl">Stats</div>;
};
export default UserStatsPage;
