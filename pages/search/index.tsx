import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { caller } from '@/server/router';
import { ImageAPIRequestQuery, ImagePage } from '@/types';
import { useSearchInfinitScroll } from '@/hooks/useSearchInfinitScroll';
import ImageGridLayout from '@/components/ImageGridLayout';
import { SearchInput, SearchKeywords } from '@/components/Search';

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
  const { images, hasMore } = useSearchInfinitScroll(props);
  return (
    <>
      <Head>
        <title>Search for images</title>
      </Head>
      <SearchInput />
      <div className="main-container">
        <SearchKeywords />
        <ImageGridLayout pagePath="/search" images={images} />
        {hasMore && <div className="loading loading-dots mx-auto block w-20 opacity-50"></div>}
      </div>
    </>
  );
};

export default SearchPage;
