import Head from 'next/head';
import { NextPage, GetServerSideProps } from 'next';
import { useFetch, ResponseImage, fetchImages } from '../../hooks/useFetch';
import SearchSection from '../../components/Search/SearchSection';
import SearchKeywords from '../../components/Search/SearchKeywords';
import ImageLayout from '../../components/Search/ImageLayout';

type Props = {
  images: ResponseImage[];
  inLastPage: boolean;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const searchParams = new URLSearchParams({ e: 'curated' });
  const { newImages, inLastPage } = await fetchImages(searchParams);
  return {
    props: { images: newImages, inLastPage }
  };
};

const Search: NextPage<Props> = ({ images, inLastPage }) => {
  const imageArray = useFetch('curated', inLastPage ? -1 : 1, '', images);
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
    </div>
  );
};
export default Search;
