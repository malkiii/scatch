import { FC, useEffect, useState } from 'react';
import { CgSearch as SearchIcon } from 'react-icons/cg';
import { cn } from '@/utils';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { useSearchTrigger } from '@/hooks/useSearchTrigger';

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

  if (!searchHistory.length) return null;
  return (
    <div className="absolute left-0 top-full z-[101] hidden w-full translate-y-3 group-focus-within:block">
      <ul className="menu w-full rounded-xl bg-neutral shadow-2xl">
        {searchHistory.map((searchValue, index) => (
          <li
            key={index}
            onMouseEnter={() => setFocusIndex(index)}
            onMouseDown={() => onClick(searchValue)}
            onMouseLeave={() => setFocusIndex(-1)}
            onKeyDown={handleKeyDown}
          >
            <div
              className={cn('gap-x-3 px-3 text-lg transition-none', {
                'bg-base-content/10': focusIndex == index
              })}
            >
              <SearchIcon size={21} />
              <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap">
                {searchValue}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

type InputProps = { value?: string };
const SearchInputSection: FC<InputProps> = ({ value }) => {
  const [inputValue, setInputValue] = useState<string>(value || '');
  const { inputRef, triggerTheSearch, handleEnter } = useSearchTrigger();

  async function handleMouseClick(searchText: string) {
    setInputValue(searchText);
    await triggerTheSearch(searchText);
  }

  return (
    <div className="mx-auto px-4 pt-20 text-center sm:pt-28">
      <h2 className="text-4xl md:text-5xl">
        Search for{' '}
        <span className="bg-gradient-to-br from-primary to-primary-focus bg-clip-text pr-1 text-transparent">
          images
        </span>
      </h2>
      <div className="group relative mx-auto my-7 flex max-w-[730px] items-center gap-x-3">
        <input
          type="search"
          ref={inputRef}
          value={inputValue}
          placeholder="Search.."
          className="theme-input h-full px-4 py-2 shadow-xl"
          onInput={e => setInputValue(e.currentTarget.value)}
          onKeyDown={handleEnter}
          autoComplete="off"
          required
        />
        <button
          className="theme-btn animate-none px-4 py-2 shadow-xl"
          onClick={async () => await triggerTheSearch()}
        >
          <SearchIcon size={30} />
        </button>
        <SuggestionsMenu value={inputValue} onClick={handleMouseClick} />
      </div>
    </div>
  );
};

export default SearchInputSection;
