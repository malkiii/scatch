import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { CgSearch } from 'react-icons/cg';

type SearchSectionProps = {
  value?: string;
};

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '%20');
}

const SearchSection: FC<SearchSectionProps> = ({ value }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(value || '');

  function goToSearchResultsPage() {
    router.push('/search/' + generateSlug(searchValue));
  }

  function handleKeyDown(event: any) {
    if (event.key === 'Enter') goToSearchResultsPage();
  }

  return (
    <div className="mx-auto text-center pt-5 sm:pt-10">
      <h2>
        Search for{' '}
        <span className="theme-gradient bg-clip-text text-transparent">
          images
        </span>
      </h2>
      <div className="max-w-[730px] text-lg flex items-center mx-auto my-7 rounded-3xl bg-gray-100 dark:bg-neutral-800 shadow-lg overflow-hidden transition-colors">
        <input
          type="search"
          value={searchValue}
          placeholder="Search.."
          className="h-full flex-grow outline-none bg-transparent py-2 px-4"
          onInput={e => setSearchValue(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          required
        />
        <button
          className="theme-btn py-2 px-5 sm:px-7 rounded-inherit"
          onClick={goToSearchResultsPage}
        >
          <CgSearch size={30} className="inline text-center" />
        </button>
      </div>
    </div>
  );
};
export default SearchSection;
