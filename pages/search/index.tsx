import Head from 'next/head';
import { NextPage, GetServerSideProps } from 'next';
import ImageLayout from '../../components/Search/ImageLayout';
import SearchSection from '../../components/Search/SearchSection';
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
  const imageArray = useFetch('curated', hasMore, '', images);
  return (
    <div className="px-8">
      <Head>
        <title>Search for images</title>
      </Head>
      <SearchSection />
      <div className="max-w-[1250px] mx-auto">
        <SearchKeywords />
        <ImageLayout images={imageArray} />
      </div>
      <ScrollToTopButton />
    </div>
  );
};
export default Search;
