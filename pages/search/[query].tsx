import { FC, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { WithRouterProps } from 'next/dist/client/with-router';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { caller } from '@/server/router';
import { ImageAPIRequestQuery, ImagePage } from '@/types';
import { getCurrentSession } from '@/utils/session';
import { useSearchInfinitScroll } from '@/hooks/useSearchInfinitScroll';
import ImageGridLayout from '@/components/ImageGridLayout';
import { PulseAnimation } from '@/components/Loading';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { FilterMenu, SearchInput } from '@/components/Search';

type RouteQuery = {
  query: string;
  o: ImageAPIRequestQuery['orientation'];
};
type PageProps = {
  searchKeyword: string;
  requestQuery: ImageAPIRequestQuery;
  initialData: ImagePage;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  const { req, res, query } = context;
  const { query: searchKeyword, o: orientation } = query as RouteQuery;

  let fetchQuery: string;
  try {
    fetchQuery = await caller.translateToEnglish({ text: searchKeyword });
  } catch (error) {
    fetchQuery = searchKeyword;
  }

  const requestQuery: ImageAPIRequestQuery = {
    endpoint: '/search',
    query: fetchQuery,
    orientation: orientation || 'all'
  };

  const key = `${searchKeyword}-${orientation || 'all'}`;
  const returnProps = { searchKeyword, requestQuery, key };
  res.setHeader('Cache-Control', 's-maxage=1200, stale-while-revalidate=600');

  try {
    const initialData = await caller.fetchImages({ params: requestQuery });

    const session = await getCurrentSession(context);
    if (session) await caller.saveActivity({ userId: session.user.id, type: 'SEARCH' });

    return {
      props: { initialData, ...returnProps }
    };
  } catch (error) {
    return {
      props: { initialData: { images: [], hasMore: false }, ...returnProps }
    };
  }
};

const NoResults: FC<{ query: string }> = ({ query }) => {
  return (
    <div className="text-center">
      <h3 className="mb-5 text-2xl sm:text-3xl lg:text-5xl">No results for “{query}”.</h3>
      <p className="text-xl sm:text-2xl lg:text-4xl">Try another search.</p>
    </div>
  );
};

export default withRouter(
  (props: InferGetServerSidePropsType<typeof getServerSideProps> & WithRouterProps) => {
    const { searchKeyword, requestQuery, initialData, router } = props;

    const hasResults = initialData.images.length > 0;
    const orientation = (router.query!.o || 'all') as ImageAPIRequestQuery['orientation'];
    const params = {
      requestQuery: { ...requestQuery, orientation },
      initialData
    };

    const { images, hasMore } = useSearchInfinitScroll(params);
    const [currentPathname] = useState<string>(router.asPath);

    const title = `${searchKeyword} images | Search and save in your albums`;

    return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        <SearchInput value={searchKeyword} />
        <div className="main-container">
          {hasResults ? (
            <>
              <div className="mb-5 flex w-full items-center justify-between px-2 md:px-4">
                <h3 className="text-2xl font-bold first-letter:capitalize lg:text-4xl">
                  {searchKeyword} images.
                </h3>
                <FilterMenu query={searchKeyword} focusOn={orientation} />
              </div>
              <ImageGridLayout pagePath={currentPathname} images={images} />
              {hasMore && <PulseAnimation />}
            </>
          ) : (
            <NoResults query={searchKeyword} />
          )}
        </div>
        <ScrollToTopButton />
      </div>
    );
  }
);
