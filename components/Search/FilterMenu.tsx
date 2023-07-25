import { FC } from 'react';
import Link from 'next/link';
import { BsAspectRatio as RatioIcon } from 'react-icons/bs';
import { MdKeyboardArrowDown as DownArrowIcon } from 'react-icons/md';
import { ImageAPIRequestQuery } from '@/types';
import { cn } from '@/utils';

type FilterOption = Exclude<ImageAPIRequestQuery['orientation'], undefined>;
const filterIcons: { [k in FilterOption]: JSX.Element | null } = {
  all: null,
  landscape: <RatioIcon />,
  portrait: <RatioIcon className="rotate-90" />
};

type FilterMenuProps = { url: URL };
const FilterMenu: FC<FilterMenuProps> = ({ url }) => {
  const currentOption = url.searchParams.get('o');
  return (
    <div className="dropdown-bottom dropdown-end dropdown">
      <label
        tabIndex={0}
        className="group btn-outline btn animate-none text-lg font-normal normal-case"
      >
        Filter{' '}
        <DownArrowIcon
          size={23}
          className="transition-transform duration-200 group-focus:-rotate-180"
        />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box z-[1] translate-y-3 bg-neutral p-2 text-lg shadow-xl"
      >
        {Object.entries(filterIcons).map(([option, icon], index) => {
          return (
            <li key={index}>
              <Link
                href={`${url.pathname}?o=${option}`}
                className={cn('gap-x-3', { 'bg-base-content/10': currentOption === option })}
              >
                {icon} {option}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FilterMenu;
