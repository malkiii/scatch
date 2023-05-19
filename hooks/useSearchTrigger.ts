import router from 'next/router';
import { useRef } from 'react';

export const useSearchTrigger = (callback?: (value?: string) => void) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function triggerTheSearch(query?: string) {
    const searchValue = query || inputRef.current?.value.trim();
    if (searchValue) {
      callback ? callback(searchValue) : null;
      router.push({
        pathname: '/search/[query]',
        query: { query: searchValue }
      });
    }
  }

  function handleEnter(event: any) {
    if (event.key === 'Enter') triggerTheSearch();
  }

  return { inputRef, triggerTheSearch, handleEnter };
};
