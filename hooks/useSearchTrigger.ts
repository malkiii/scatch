import { useRef } from 'react';
import router from 'next/router';

function storeInHistory(searchValue: string) {
  const searchHistory = localStorage.getItem('search_history') || '[]';
  const historyValues = JSON.parse(searchHistory) as string[];
  const historyLimit = 5;

  const index = historyValues.indexOf(searchValue as string);
  if (index > -1) historyValues.splice(index, 1);
  else if (historyValues.length == historyLimit) historyValues.pop();

  const newHistory = JSON.stringify([searchValue, ...historyValues]);
  localStorage.setItem('search_history', newHistory);
}

export const useSearchTrigger = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerTheSearch = async (query?: string) => {
    const searchValue = query || inputRef.current?.value.trim();
    if (!searchValue) return;
    storeInHistory(searchValue);
    router.push({
      pathname: '/search/[query]',
      query: { query: searchValue }
    });
  };

  function handleEnter(event: any) {
    if (event.key === 'Enter') triggerTheSearch();
  }

  return { inputRef, triggerTheSearch, handleEnter };
};
