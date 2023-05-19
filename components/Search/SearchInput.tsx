import { FC, useEffect, useState } from 'react';
import { NextRouter, withRouter } from 'next/router';
import { CgSearch as SearchIcon } from 'react-icons/cg';
import { useSearchHistory } from '@/hooks/useSearchHistory';

function storeInHistory(searchValue: string) {
  const searchHistory = localStorage.getItem('search_history') || '[]';
  const historyValues = JSON.parse(searchHistory) as string[];
  const historyLimit = 5;

  const index = historyValues.indexOf(searchValue);
  if (index > -1) historyValues.splice(index, 1);
  else if (historyValues.length == historyLimit) historyValues.pop();

  const newHistory = JSON.stringify([searchValue, ...historyValues]);
  localStorage.setItem('search_history', newHistory);
}

type SuggestionsMenuProps = {
  value: string;
  onClick: (searchText: string) => void;
};

const SuggestionsMenu: FC<SuggestionsMenuProps> = ({ value, onClick }) => {
  const searchHistory = useSearchHistory(value);
  const [focusIndex, setFocusIndex] = useState<number>(-1);

  function handleKeyDown({ key }: any) {
    if (key == 'Enter' && focusIndex > -1) {
      onClick(searchHistory[focusIndex]);
      return;
    }

    const isUpKey = key == 'ArrowUp';
    const isDownKey = key == 'ArrowDown';
    if (!isUpKey && !isDownKey) return;

    const canGoUp = isUpKey && focusIndex > 0;
    const canGoDown = isDownKey && focusIndex < searchHistory.length - 1;
    const direction = focusIndex == -1 ? 1 : canGoUp ? -1 : canGoDown ? 1 : 0;

    setFocusIndex(focusIndex + direction);
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className="group-focus-within:block hidden absolute w-full left-0 top-full z-[101] translate-y-3">
      <ul className="shadow-3xl rounded-xl w-full">
        {searchHistory.map((searchValue, index) => (
          <li
            key={index}
            className={'menu-suggestion ' + (focusIndex == index ? 'focus' : '')}
            onMouseEnter={() => setFocusIndex(index)}
            onMouseDown={() => onClick(searchValue)}
            onMouseLeave={() => setFocusIndex(-1)}
            onKeyDown={handleKeyDown}
          >
            <SearchIcon size={21} />
            <span className="inline-block whitespace-nowrap text-ellipsis overflow-hidden">
              {searchValue}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

type InputProps = {
  value?: string;
  router: NextRouter;
};
const SearchInput: FC<InputProps> = ({ value, router }) => {
  const [inputValue, setInputValue] = useState<string>(value || '');

  function triggerTheSearch(query?: string) {
    const searchValue = query || inputValue.trim();
    if (searchValue) {
      storeInHistory(searchValue);
      router.push({
        pathname: '/search/[query]',
        query: { query: searchValue }
      });
    }
  }

  function handleKeyDown(event: any) {
    if (event.key === 'Enter') triggerTheSearch();
  }

  function handleMouseClick(searchText: string) {
    setInputValue(searchText);
    triggerTheSearch(searchText);
  }

  return (
    <div className="mx-auto text-center pt-5 px-4 sm:pt-10">
      <h2>
        Search for <span className="theme-gradient bg-clip-text text-transparent">images</span>
      </h2>
      <div className="relative group max-w-[730px] text-lg flex items-center mx-auto my-7 rounded-3xl bg-cs-change shadow-lg transition-colors">
        <input
          type="search"
          value={inputValue}
          placeholder="Search.."
          className="h-full flex-grow outline-none bg-transparent py-2 px-4"
          onInput={e => setInputValue(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          required
        />
        <button
          className="theme-btn py-2 px-5 sm:px-7 rounded-inherit"
          onClick={() => triggerTheSearch()}
        >
          <SearchIcon size={30} className="inline text-center" />
        </button>
        <SuggestionsMenu value={inputValue} onClick={handleMouseClick} />
      </div>
    </div>
  );
};
export default withRouter(SearchInput);
