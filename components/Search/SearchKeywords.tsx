import { FC } from 'react';
import Link from 'next/link';

const keywords = ['Popular', 'Wallpapers 4k', 'Food', 'Cars', 'Animals'];

const SearchKeywords: FC = () => {
  return (
    <div className="mb-7 flex w-full flex-wrap items-center justify-center gap-3 px-1">
      {keywords.map((keyword, index) => (
        <Link
          key={index}
          className="theme-btn text-sm sm:text-base"
          href={{
            pathname: '/search/[query]',
            query: { query: keyword.toLowerCase() }
          }}
        >
          {keyword}
        </Link>
      ))}
    </div>
  );
};

export default SearchKeywords;
