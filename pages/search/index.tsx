import Head from 'next/head';
import { NextPage, GetServerSideProps } from 'next';
import ImageLayout from '../../components/Search/ImageLayout';
import SearchInput from '../../components/Search/SearchInput';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import SearchKeywords from '../../components/Search/SearchKeywords';
import { useFetch, ResponseImage, fetchImages } from '../../hooks/useFetch';

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

const Search: NextPage<Props> = ({ images, hasMore }) => {
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
        <ImageLayout pathname="/search" images={imageArray} />
      </div>
      <ScrollToTopButton />
    </div>
  );
};
export default Search;
