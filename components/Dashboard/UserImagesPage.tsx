import { FC } from 'react';
import { DashboardPageProps } from '.';

const UserImagesPage: FC<{ user: DashboardPageProps['user'] }> = ({ user }) => {
  return <div className="w-full p-4 text-4xl">Images</div>;
};
export default UserImagesPage;
