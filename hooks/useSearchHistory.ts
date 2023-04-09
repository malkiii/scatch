import { useState, useEffect } from 'react';

type SearchHistory = string[];

export const useSearchHistory = (prefix = '') => {
  const [searchValues, setSearchValues] = useState<SearchHistory>([]);

  function getSearchHistory(): SearchHistory {
    const searchHistory = localStorage.getItem('search_history');
    const values: SearchHistory = JSON.parse(searchHistory || '[]');
    return values.filter(value => value.startsWith(prefix) && value != prefix);
  }

  useEffect(() => {
    setSearchValues(getSearchHistory());
  }, [prefix]);

  function remove(value: string) {
    const index = searchValues.indexOf(value);
    const newArray = searchValues;
    newArray.splice(index, 1);
    setSearchValues(newArray);
  }

  return searchValues;
};
