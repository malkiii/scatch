import { FC } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { caller } from '@/server/router';
import { ImageAPIRequestQuery, ImagePage } from '@/types';
import { useSearchInfinitScroll } from '@/hooks/useSearchInfinitScroll';
import ButtonsSlider from '@/components/ButtonsSlider';
import ImageGridLayout from '@/components/ImageGridLayout';
import { SearchInput } from '@/components/Search';

const keywords = ['Popular', 'Wallpapers 4k', 'Food', 'Cars', 'Animals'];

const SearchKeywords: FC = () => {
  return (
    <div className="relative mb-7">
      <ButtonsSlider scrollBy={350} className="from-base-100 min-[650px]:hidden">
        <div className="mx-auto flex w-[650px] items-center justify-between px-1">
          {keywords.map((keyword, index) => (
            <Link
              key={index}
              className="theme-btn text-sm sm:text-base"
              href={{
                pathname: '/search/[query]',
                query: { query: keyword.toLowerCase() }
              }}
            >
              {keyword}
            </Link>
          ))}
        </div>
      </ButtonsSlider>
    </div>
  );
};

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
