import Head from 'next/head';
import { FC, useState } from 'react';
import { ResponseImage } from '@/types';
import { fetchImages } from '@/utils/fetchImages';
import translateToEnglish from '@/utils/translate';
import { GetServerSideProps } from 'next';
import { withRouter, NextRouter } from 'next/router';
import { useInfinitScroll } from '@/hooks/useInfinitScroll';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { FilterMenu, ImageGridLayout, SearchInput } from '@/components/Search';

type RouteQuery = {
  query: string;
  o: string;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { query: searchKeyword, o: orientation } = context.query as RouteQuery;
  const fetchQuery = await translateToEnglish(searchKeyword);
  const searchParams: Record<string, string> = {
    e: 'search',
    q: fetchQuery,
    o: orientation
  };

  const { res } = context;
  res.setHeader('Cache-Control', 's-maxage=1200, stale-while-revalidate=600');

  const { images, hasMore } = await fetchImages(searchParams);
  const key = searchKeyword + (orientation || '');

  return {
    props: { searchKeyword, fetchQuery, images, hasMore, key }
  };
};

const NoResults: FC<{ query: string }> = ({ query }) => {
  return (
    <div className="text-center">
      <h3 className="text-2xl sm:text-3xl lg:text-5xl mb-5">
        No results for “{query}”.
      </h3>
      <p className="text-xl sm:text-2xl lg:text-4xl">Try another search.</p>
    </div>
  );
};

type PageProps = {
  searchKeyword: string;
  fetchQuery: string;
  images: ResponseImage[];
  hasMore: boolean;
  router: NextRouter;
};

export default withRouter((props: PageProps) => {
  const { searchKeyword, fetchQuery, images, hasMore, router } = props;

  const hasResults = images.length > 0;
  const orientation = (router.query!.o as string) || 'all';
  const params = {
    endpoint: 'search',
    fetchQuery,
    initialImages: images,
    orientation,
    hasMore
  };

  const imageArray = useInfinitScroll(params);
  const [currentPathname, _] = useState<string>(router.asPath);

  const title = `${searchKeyword} images | Search and save in your albums`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <SearchInput value={searchKeyword} />
        <div className="main-container bg-cs-change p-4 my-7 rounded-3xl">
          {hasResults ? (
            <>
              <div className="flex items-center justify-between w-full mb-5">
                <h3 className="font-bold text-2xl lg:text-4xl first-letter:capitalize">
                  {searchKeyword} images.
                </h3>
                <FilterMenu query={searchKeyword} focusOn={orientation} />
              </div>
              <ImageGridLayout pagePath={currentPathname} images={imageArray} />
            </>
          ) : (
            <NoResults query={searchKeyword} />
          )}
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
});
