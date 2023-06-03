import Head from 'next/head';
import { FC, useState } from 'react';
import { ImageAPIRequestQuery, ImagePage } from '@/types';
import { withRouter } from 'next/router';
import { PulseAnimation } from '@/components/Loading';
import { useInfinitScroll } from '@/hooks/useInfinitScroll';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { FilterMenu, ImageGridLayout, SearchInput } from '@/components/Search';
import { WithRouterProps } from 'next/dist/client/with-router';
import { caller } from '@/server/router';

type RouteQuery = {
  query: string;
  orientation: ImageAPIRequestQuery['orientation'];
};
type PageProps = ImagePage & {
  searchKeyword: string;
  fetchQuery: string;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  const { query: searchKeyword, orientation } = context.query as RouteQuery;

  let fetchQuery: string;
  try {
    fetchQuery = await caller.translateToEnglish({ text: searchKeyword });
  } catch (error) {
    fetchQuery = searchKeyword;
  }

  const searchParams: ImageAPIRequestQuery = {
    endpoint: '/search',
    query: fetchQuery,
    orientation
  };

  const key = `${searchKeyword}-${orientation || 'all'}`;
  const returnProps = { searchKeyword, fetchQuery, key };
  context.res.setHeader('Cache-Control', 's-maxage=1200, stale-while-revalidate=600');

  try {
    const { images, hasMore } = await caller.fetchImages({ params: searchParams });
    return {
      props: { images, hasMore, ...returnProps }
    };
  } catch (error) {
    return {
      props: { images: [], hasMore: false, ...returnProps }
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
    const { searchKeyword, fetchQuery, router } = props;

    const hasResults = props.images.length > 0;
    const orientation = (router.query!.o || 'all') as ImageAPIRequestQuery['orientation'];
    const params = {
      endpoint: 'search',
      fetchQuery,
      initialImages: props.images,
      orientation,
      hasMore: props.hasMore
    };

    const { images, hasMore } = useInfinitScroll(params);
    const [currentPathname, _] = useState<string>(router.asPath);

    const title = `${searchKeyword} images | Search and save in your albums`;

    return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        <SearchInput value={searchKeyword} />
        <div className="main-container bg-cs-change my-7 rounded-3xl py-4">
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
