import { CgSearch } from 'react-icons/cg';
import { FC, useRef } from 'react';
import { NextRouter, withRouter } from 'next/router';

type InputProps = {
  value?: string;
  router: NextRouter;
};

const SearchInput: FC<InputProps> = ({ value, router }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function triggerTheSearch(input: HTMLInputElement) {
    const searchValue = input.value;
    if (searchValue)
      router.push({
        pathname: '/search/[query]',
        query: { query: searchValue }
      });
  }

  function handleKeyDown(event: any) {
    if (event.key === 'Enter') triggerTheSearch(event.target);
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
          ref={inputRef}
          defaultValue={value}
          placeholder="Search.."
          className="h-full flex-grow outline-none bg-transparent py-2 px-4"
          onKeyDown={handleKeyDown}
          autoComplete="off"
          required
        />
        <button
          className="theme-btn py-2 px-5 sm:px-7 rounded-inherit"
          onClick={e => {
            // the search input must always be the previous element
            const input = e.currentTarget.previousSibling as HTMLInputElement;
            triggerTheSearch(input);
          }}
        >
          <CgSearch size={30} className="inline text-center" />
        </button>
      </div>
    </div>
  );
};
export default withRouter(SearchInput);
