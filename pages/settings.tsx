import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Image from 'next/image';
import { User } from 'next-auth';
import { resizeAvatar } from '@/utils';
import { getCurrentSession } from '@/utils/session';

type PageProps = { user: User };
export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  const session = await getCurrentSession(context);
  if (!session) return { notFound: true };

  return { props: { user: session.user } };
};

const settingsPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = props => {
  const { user } = props;
  return (
    <div>
      <Image src={resizeAvatar(user.image!)} width={360} height={360} alt="avatar" />
    </div>
  );
};

export default settingsPage;
