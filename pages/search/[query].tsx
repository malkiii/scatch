import Head from 'next/head';
import { FC, useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { fetchImages } from '../../lib/fetchImages';
import { withRouter, NextRouter } from 'next/router';
import { useFetch, ResponseImage } from '../../hooks/useFetch';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import {
  FilterMenu,
  ImageGridLayout,
  SearchInput
} from '../../components/Search';

type Props = {
  searchQuery: string;
  images: ResponseImage[];
  hasMore: boolean;
  router: NextRouter;
};

type RouteQuery = {
  query: string;
  o: string;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { query: searchQuery, o: orientation } = query as RouteQuery;
  const searchParams = new URLSearchParams({ e: 'search', q: searchQuery });
  if (orientation) searchParams.append('o', orientation);

  const { newImages, hasMore } = await fetchImages(searchParams);
  const key = searchQuery + (orientation || '');

  return {
    props: { searchQuery, images: newImages, hasMore, key }
  };
};

const NoResults: FC<{ query: string }> = ({ query }) => {
  return (
    <>
      <h3 className="text-2xl sm:text-3xl lg:text-5xl mb-5 first-letter:capitalize">
        No results for “{query}”.
      </h3>
      <p className="text-xl sm:text-2xl lg:text-4xl">Try another search.</p>
    </>
  );
};

const SearchResultsPage: NextPage<Props> = props => {
  const { searchQuery, images, hasMore, router } = props;

  const hasResults = images.length > 0;
  const orientation = (router.query!.o as string) || 'all';
  const params = {
    endpoint: 'search',
    searchQuery,
    initialImages: images,
    orientation,
    hasMore
  };

  const imageArray = useFetch(params);
  const [currentPathname, _] = useState<string>(router.asPath);

  return (
    <>
      <Head>
        <title>
          {searchQuery + ' images | Search and save in your albums'}
        </title>
      </Head>
      <div className="px-8">
        <SearchInput value={searchQuery} />
        <div className="max-w-screen-xl mx-auto">
          {hasResults ? (
            <>
              <div className="flex items-center justify-between w-full mb-5">
                <h3 className="font-bold text-2xl lg:text-4xl first-letter:capitalize">
                  {searchQuery} images.
                </h3>
                <FilterMenu query={searchQuery} focusOn={orientation} />
              </div>
              <ImageGridLayout fullPath={currentPathname} images={imageArray} />
            </>
          ) : (
            <NoResults query={searchQuery} />
          )}
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
};
export default withRouter(SearchResultsPage);
