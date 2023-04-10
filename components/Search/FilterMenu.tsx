import { FC } from 'react';
import Link from 'next/link';
import { BsAspectRatio } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { useToggleMenu } from '@hooks/useToggleMenu';

type FilterMenuProps = {
  query: string;
  focusOn: string;
};

const transition = { type: 'tween', duration: 0.1 };
const menuVarinats = {
  hidden: { opacity: 0, transition },
  visible: { opacity: 1, transition }
};

type OptionListProps = FilterMenuProps;

const OptionList: FC<OptionListProps> = ({ query, focusOn }) => {
  const options = ['all', 'portrait', 'landscape'];
  const styles = {
    focus: 'dark:text-dark dark:bg-white bg-neutral-200',
    unfocus:
      'bg-white dark:bg-neutral-900 dark:hover:bg-neutral-800 hover:bg-neutral-200'
  };

  function getFilterURL(option: string): string {
    const optionParam = option == 'all' ? '' : '?o=' + option;
    return `/search/${query}${optionParam}`;
  }

  return (
    <ul>
      {options.map((option, index) => (
        <Link
          key={index}
          href={getFilterURL(option)}
          className={
            'filter-option ' +
            (focusOn == option ? styles.focus : styles.unfocus)
          }
        >
          {option != 'all' && (
            <BsAspectRatio
              className={option == 'portrait' ? 'rotate-90' : ''}
            />
          )}
          {option}
        </Link>
      ))}
    </ul>
  );
};

type FilterButtonProps = {
  open: boolean;
  onClick: () => void;
};

const FilterButton: FC<FilterButtonProps> = ({ open, onClick }) => {
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
          (open ? 'rotate-180' : '')
        }
      />
    </button>
  );
};

const FilterMenu: FC<FilterMenuProps> = props => {
  const { isOpen, menuRef, toggle } = useToggleMenu();
  return (
    <div ref={menuRef} className="relative">
      <FilterButton open={isOpen} onClick={toggle} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full translate-y-2 right-0 z-10 shadow-3xl"
            variants={menuVarinats}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <OptionList {...props} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default FilterMenu;
