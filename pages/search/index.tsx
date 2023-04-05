import Head from 'next/head';
import { NextPage, GetServerSideProps } from 'next';
import { fetchImages } from '../../utils/fetchImages';
import { useInfinitScroll, ResponseImage } from '../../hooks/useInfinitScroll';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import {
  SearchInput,
  SearchKeywords,
  ImageGridLayout
} from '../../components/Search';

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
    <div className="px-8">
      <Head>
        <title>Search for images</title>
      </Head>
      <SearchInput />
      <div className="max-w-screen-xl mx-auto">
        <SearchKeywords />
        <ImageGridLayout pagePath="/search" images={imageArray} />
      </div>
      <ScrollToTopButton />
    </div>
  );
};
export default SearchPage;
