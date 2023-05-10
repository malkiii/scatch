import { FC } from 'react';
import Link from 'next/link';
import OptionMenu from '../OptionMenu';
import { BsAspectRatio } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useToggleMenu } from '@/hooks/useToggleMenu';

type FilterButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

const FilterButton: FC<FilterButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      className="flex items-center gap-1 border-2 p-2 rounded-md px-4 dark:border-white/40 dark:hover:border-white transition-colors group border-dark/40 hover:border-dark"
      onClick={onClick}
    >
      Filter
      <MdKeyboardArrowDown
        size={22}
        className={
          'transition-all dark:text-white/40 dark:group-hover:text-white text-dark/40 group-hover:text-dark ' +
          (isOpen ? 'rotate-180' : '')
        }
      />
    </button>
  );
};

const filterOptions = ['all', 'portrait', 'landscape'];

type FilterMenuProps = {
  query: string;
  focusOn: string;
};

const FilterMenu: FC<FilterMenuProps> = props => {
  const { query, focusOn } = props;
  const { isOpen, menuRef, toggle } = useToggleMenu();

  function getFilterURL(option: string): string {
    const optionParam = option == 'all' ? '' : '?o=' + option;
    return '/search/' + query + optionParam;
  }

  const toggleParams = { isOpen, onClick: toggle };

  return (
    <div ref={menuRef} className="relative">
      <FilterButton {...toggleParams} />
      <OptionMenu {...toggleParams} focusOn={filterOptions.indexOf(focusOn)}>
        <div>
          {filterOptions.map((option, index) => (
            <Link
              key={index}
              href={getFilterURL(option)}
              className="flex items-center gap-2"
            >
              {option != 'all' && (
                <BsAspectRatio
                  className={option == 'portrait' ? 'rotate-90' : ''}
                />
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
