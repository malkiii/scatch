import Head from 'next/head';
import { authOptions } from '@/utils/auth';
import { User, getServerSession } from 'next-auth';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import UserSection from '@/components/Dashboard/UserSection';
import { createUsernameParam } from '@/utils';

type PageProps = {
  user: User;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: { destination: '/login', permanent: false }
    };
  }

  const username = context.query.username as string;
  const isValidUsername = createUsernameParam(session.user.name!) === username;
  if (!isValidUsername) {
    return {
      notFound: true
    };
  }

  context.res.setHeader('Cache-Control', 's-maxage=1200, stale-while-revalidate=600');

  return { props: { user: session.user } };
};

const dashboardPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = props => {
  const title = `${props.user.name} | Scatch`;
  return (
    <div className="py-20">
      <Head>
        <title>{title}</title>
      </Head>
      <UserSection {...props} />
    </div>
  );
};
export default dashboardPage;
