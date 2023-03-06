import { NextPage } from 'next';
import SearchSection from '../../components/Search/SearchSection';
import SearchKeywords from '../../components/Search/SearchKeywords';
import ImageLayout from '../../components/Search/ImageLayout';

const Search: NextPage = () => {
  return (
    <div className="px-8">
      <SearchSection />
      <div className="max-w-[1350px] mx-auto">
        <SearchKeywords />
        {/* <ImageLayout /> */}
      </div>
    </div>
  );
};
export default Search;
