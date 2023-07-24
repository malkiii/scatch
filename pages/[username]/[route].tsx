import { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/types';
import { createUsernameParam } from '@/utils';
import { getCurrentSession } from '@/utils/session';
import DashboardPages, { DashboardPageProps, DashboardPageRoute } from '@/components/Dashboard';
import DashboardLayout from '@/components/Dashboard/layout';

const validRoutes: DashboardPageRoute[] = ['images', 'albums', 'favorite', 'stats'];

export const getServerSideProps: GetServerSideProps<DashboardPageProps> = async context => {
  const session = await getCurrentSession(context);
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
  const router = useRouter();
  const { username, route } = router.query;
  const [currentRoute, setCurrentRoute] = useState(route as DashboardPageRoute | null);
  const componentProps = { ...props, router };

  useEffect(() => {
    const { route } = router.query;
    if (!validRoutes.includes(route as any)) return;
    setCurrentRoute(route as DashboardPageRoute);
  }, [router]);

  return (
    <DashboardLayout
      {...componentProps}
      userProfileRoute={'/' + username}
      currentPageRoute={currentRoute || 'images'}
    >
      <DashboardPages {...componentProps} currentPageRoute={currentRoute} />
    </DashboardLayout>
  );
};
export default DashboardPage;
