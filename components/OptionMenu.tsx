import { Children, FC, ReactElement, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils';

const transition = { type: 'tween', duration: 0.1 };
const menuVarinats = {
  hidden: { opacity: 0, y: -4, transition },
  visible: { opacity: 1, y: 10, transition }
};

type OptionListProps = MenuProps;

const OptionList: FC<OptionListProps> = props => {
  const { focusOn, children, onItemClick } = props;
  const container = Children.toArray(children)[0] as ReactElement;
  return (
    <ul className="rounded-inherit bg-white dark:bg-[#222]">
      {Children.toArray(container.props.children).map((option, index) => (
        <div
          key={index}
          onClick={onItemClick}
          className={cn(
            'menu-option group',
            [
              'bg-neutral-200 dark:bg-white dark:text-dark',
              'hover:bg-neutral-200 dark:hover:bg-[#292929]'
            ][+!(index == focusOn)]
          )}
        >
          {option}
        </div>
      ))}
    </ul>
  );
};

type ClickFunction = (e: any) => void;
type MenuProps = {
  isOpen: boolean;
  focusOn?: number;
  className?: string;
  children: ReactNode;
  onClick?: ClickFunction;
  onItemClick?: ClickFunction;
};

const OptionMenu: FC<MenuProps> = props => {
  const { isOpen, className, onClick } = props;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClick}
          className={cn('absolute z-10 rounded-md shadow-2xl', className)}
          variants={menuVarinats}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <OptionList {...props} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default OptionMenu;
