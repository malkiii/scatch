import { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/types';
import { getCurrentSession } from '@/utils/session';
import DashboardPages, { DashboardPageProps, dashboardPageRoutes } from '@/components/Dashboard';
import DashboardLayout from '@/components/Dashboard/layout';

export const getServerSideProps: GetServerSideProps<DashboardPageProps> = async context => {
  const session = await getCurrentSession(context);

  const user = session!.user;
  const initialPageRoute = (context.query.route as any) || null;
  const isValidRoute = initialPageRoute == null || dashboardPageRoutes.includes(initialPageRoute);
  if (!isValidRoute) return { notFound: true };

  return { props: { user, initialPageRoute } };
};

type DashboardPageType = NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>>;
const DashboardPage: DashboardPageType = props => {
  const router = useRouter();
  const { username, route } = router.query;
  const [currentRoute, setCurrentRoute] = useState(route as DashboardPageProps['initialPageRoute']);
  const componentProps = { ...props, router };

  useEffect(() => {
    const { route } = router.query;
    if (!dashboardPageRoutes.includes(route as any)) return;
    setCurrentRoute(route as DashboardPageProps['initialPageRoute']);
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
