import Head from 'next/head';
import { NextPage } from 'next';
import { useFetch } from '../../hooks/useFetch';
import SearchSection from '../../components/Search/SearchSection';
import SearchKeywords from '../../components/Search/SearchKeywords';
import ImageLayout from '../../components/Search/ImageLayout';

const Search: NextPage = () => {
  const imageArray = useFetch('curated');
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
