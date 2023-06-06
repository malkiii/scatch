import { authOptions } from '@/utils/auth';
import { NextPageWithLayout } from '@/types';
import { createUsernameParam } from '@/utils';
import { getServerSession } from 'next-auth';
import DashboardLayout from '@/components/Dashboard/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import DashboardPages, { DashboardPageProps, DashboardPageRoute } from '@/components/Dashboard';

const validRoutes: DashboardPageRoute[] = ['images', 'albums', 'favorite', 'stats'];

export const getServerSideProps: GetServerSideProps<DashboardPageProps> = async context => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: { destination: '/login', permanent: false }
    };
  }

  const username = context.query.username as string;
  const initialPageRoute = (context.query.route as any) || null;
  const isValidUsername = createUsernameParam(session.user.name!) === username;
  const isValidRoute = initialPageRoute == null || validRoutes.includes(initialPageRoute);
  if (!isValidUsername || !isValidRoute) return { notFound: true };

  context.res.setHeader('Cache-Control', 's-maxage=1200, stale-while-revalidate=600');

  return { props: { user: session.user, initialPageRoute } };
};

type DashboardPageType = NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>>;
const DashboardPage: DashboardPageType = props => {
  const { user, initialPageRoute } = props;
  const router = useRouter();
  const componentProps = { ...props, router };

  return (
    <DashboardLayout {...componentProps}>
      <DashboardPages {...componentProps} />
    </DashboardLayout>
  );
};
export default DashboardPage;
