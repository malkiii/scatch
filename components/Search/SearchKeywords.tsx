import { FC } from 'react';
import Link from 'next/link';

const keywords = ['Popular', 'Wallpapers', 'Food', 'Nature', 'Animals'];

const SearchKeywords: FC = () => {
  return (
    <div className="hidden sm:flex items-center justify-center w-full pb-5 gap-3">
      {keywords.map((keyword, index) => (
        <Link key={index} href="/search" className="theme-btn">
          {keyword}
        </Link>
      ))}
    </div>
  );
};
export default SearchKeywords;
