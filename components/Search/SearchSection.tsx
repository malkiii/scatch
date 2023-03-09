import { FC, useRef } from 'react';
import { useRouter } from 'next/router';
import { CgSearch } from 'react-icons/cg';

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '%20');
}

const SearchSection: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function goToSearchResultsPage() {
    const searchText = inputRef.current!.value;
    const slug = generateSlug(searchText);
    router.push('/search/' + slug);
  }

  return (
    <div className="mx-auto text-center pt-10">
      <h2 className="text-5xl">
        Search for <span className="text-theme">images</span>
      </h2>
      <div className="max-w-[730px] text-lg flex items-center mx-auto my-7 rounded-3xl bg-gray-50 dark:bg-neutral-800 shadow-lg overflow-hidden transition-colors">
        <input
          type="search"
          className="h-full flex-grow outline-none bg-transparent py-2 px-4"
          autoComplete="off"
          placeholder="Search.."
          ref={inputRef}
          required
        />
        <button
          className="theme-btn py-2 px-7 rounded-inherit"
          onClick={goToSearchResultsPage}
        >
          <CgSearch size={30} className="inline text-center" />
        </button>
      </div>
    </div>
  );
};
export default SearchSection;
