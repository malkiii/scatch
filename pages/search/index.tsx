import Head from 'next/head';
import { caller } from '@/server/router';
import { PulseAnimation } from '@/components/Loading';
import { ImageAPIRequestQuery, ImagePage } from '@/types';
import { useInfinitScroll } from '@/hooks/useInfinitScroll';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { SearchInput, SearchKeywords, ImageGridLayout } from '@/components/Search';

type PageProps = {
  requestQuery: ImageAPIRequestQuery;
  initialData: ImagePage;
};
export const getServerSideProps: GetServerSideProps<PageProps> = async ({ res }) => {
  const requestQuery: ImageAPIRequestQuery = { endpoint: '/curated' };
  const initialData = await caller.fetchImages({ params: { endpoint: '/curated' } });
  res.setHeader('Cache-Control', 's-maxage=1200, stale-while-revalidate=600');

  return { props: { requestQuery, initialData } };
};

const SearchPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = props => {
  const { images, hasMore } = useInfinitScroll(props);
  return (
    <div>
      <Head>
        <title>Search for images</title>
      </Head>
      <SearchInput />
      <div className="main-container mb-7">
        <SearchKeywords />
        <ImageGridLayout pagePath="/search" images={images} />
        {hasMore && <PulseAnimation />}
      </div>
      <ScrollToTopButton />
    </div>
  );
};
export default SearchPage;
