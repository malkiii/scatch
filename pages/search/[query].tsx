import Head from 'next/head';
import { FC, useState } from 'react';
import { ResponseImage } from '@/types';
import { withRouter } from 'next/router';
import { fetchImages } from '@/utils/fetchImages';
import translateToEnglish from '@/utils/translate';
import { PulseAnimation } from '@/components/Loading';
import { useInfinitScroll } from '@/hooks/useInfinitScroll';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { FilterMenu, ImageGridLayout, SearchInput } from '@/components/Search';
import { WithRouterProps } from 'next/dist/client/with-router';

type RouteQuery = {
  query: string;
  o: string;
};
type PageProps = {
  searchKeyword: string;
  fetchQuery: string;
  images: ResponseImage[];
  hasMore: boolean;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  const { query: searchKeyword, o: orientation } = context.query as RouteQuery;
  const fetchQuery = await translateToEnglish(searchKeyword);
  const searchParams: Record<string, string> = {
    e: 'search',
    q: fetchQuery,
    o: orientation
  };

  context.res.setHeader('Cache-Control', 's-maxage=1200, stale-while-revalidate=600');

  const { images, hasMore } = await fetchImages(searchParams);
  const key = searchKeyword + (orientation || '');

  return {
    props: { searchKeyword, fetchQuery, images, hasMore, key }
  };
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
    const orientation = (router.query!.o as string) || 'all';
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
