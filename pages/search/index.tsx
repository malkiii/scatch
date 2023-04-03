import Head from 'next/head';
import { NextPage, GetServerSideProps } from 'next';
import { fetchImages } from '../../lib/fetchImages';
import { useFetch, ResponseImage } from '../../hooks/useFetch';
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
  const searchParams = new URLSearchParams({ e: 'curated' });
  const { newImages, hasMore } = await fetchImages(searchParams);
  return {
    props: { images: newImages, hasMore }
  };
};

const SearchPage: NextPage<Props> = ({ images, hasMore }) => {
  const params = {
    endpoint: 'curated',
    initialImages: images,
    hasMore
  };

  const imageArray = useFetch(params);
  return (
    <div className="px-8">
      <Head>
        <title>Search for images</title>
      </Head>
      <SearchInput />
      <div className="max-w-screen-xl mx-auto">
        <SearchKeywords />
        <ImageGridLayout fullPath="/search" images={imageArray} />
      </div>
      <ScrollToTopButton />
    </div>
  );
};
export default SearchPage;
