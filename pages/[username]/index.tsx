import Head from 'next/head';
import { authOptions } from '@/utils/auth';
import { NextPageWithLayout } from '@/types';
import { createUsernameParam } from '@/utils';
import { User, getServerSession } from 'next-auth';
import DashboardLayout from '@/components/Dashboard/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

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

const dashboardPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = props => {
  const title = `${props.user.name} | Scatch`;
  return (
    <div className="">
      <Head>
        <title>{title}</title>
      </Head>
    </div>
  );
};

dashboardPage.getLayout = page => {
  return <DashboardLayout {...page.props}>{page}</DashboardLayout>;
};

export default dashboardPage;
