import Head from 'next/head';
import { ResponseImage } from '@utils/types';
import { fetchImages } from '@utils/fetchImages';
import { NextPage, GetServerSideProps } from 'next';
import { useInfinitScroll } from '@hooks/useInfinitScroll';
import ScrollToTopButton from '@components/ScrollToTopButton';
import {
  SearchInput,
  SearchKeywords,
  ImageGridLayout
} from '@components/Search';

type Props = {
  images: ResponseImage[];
  hasMore: boolean;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const searchParams = { e: 'curated' };
  const data = await fetchImages(searchParams);

  return { props: data };
};

const SearchPage: NextPage<Props> = ({ images, hasMore }) => {
  const params = {
    endpoint: 'curated',
    initialImages: images,
    hasMore
  };

  const imageArray = useInfinitScroll(params);

  return (
    <div className="px-2">
      <Head>
        <title>Search for images</title>
      </Head>
      <SearchInput />
      <div className="main-container">
        <SearchKeywords />
        <ImageGridLayout pagePath="/search" images={imageArray} />
      </div>
      <ScrollToTopButton />
    </div>
  );
};
export default SearchPage;
