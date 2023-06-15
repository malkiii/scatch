import { FC } from 'react';
import Link from 'next/link';
import OptionMenu from '../OptionMenu';
import { BsAspectRatio } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useToggleMenu } from '@/hooks/useToggleMenu';
import { ImageAPIRequestQuery } from '@/types';
import { cn } from '@/utils';

type FilterButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

const FilterButton: FC<FilterButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className="group flex items-center gap-1 rounded-md border-2 border-dark/40 p-2 px-4 transition-colors hover:border-dark dark:border-white/40 dark:hover:border-white"
      onClick={onClick}
    >
      Filter
      <MdKeyboardArrowDown
        size={22}
        className={cn(
          'text-dark/40 transition-all group-hover:text-dark dark:text-white/40 dark:group-hover:text-white',
          { 'rotate-180': isOpen }
        )}
      />
    </button>
  );
};

const filterOptions = ['all', 'portrait', 'landscape'];

type FilterMenuProps = {
  query: string;
  focusOn: ImageAPIRequestQuery['orientation'];
};

const FilterMenu: FC<FilterMenuProps> = props => {
  const { query, focusOn } = props;
  const { isOpen, menuRef, toggle } = useToggleMenu();

  function getFilterURL(option: string): string {
    const optionParam = option == 'all' ? '' : '?o=' + option;
    return '/search/' + query + optionParam;
  }

  const toggleParams = { isOpen, onClick: toggle, className: 'top-full right-0' };

  return (
    <div ref={menuRef} className="relative">
      <FilterButton {...toggleParams} />
      <OptionMenu {...toggleParams} focusOn={filterOptions.indexOf(focusOn as any)}>
        <div>
          {filterOptions.map((option, index) => (
            <Link key={index} href={getFilterURL(option)} className="flex items-center gap-2 p-3">
              {option != 'all' && (
                <BsAspectRatio className={cn({ 'rotate-90': option == 'portrait' })} />
              )}
              {option}
            </Link>
          ))}
        </div>
      </OptionMenu>
    </div>
  );
};
export default FilterMenu;
