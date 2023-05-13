import { motion, AnimatePresence } from 'framer-motion';
import { FC, ReactElement, ReactNode, Children } from 'react';

const transition = { type: 'tween', duration: 0.1 };
const menuVarinats = {
  hidden: { opacity: 0, transition },
  visible: { opacity: 1, transition }
};

type OptionListProps = MenuProps;

const OptionList: FC<OptionListProps> = props => {
  const { focusOn, children, onItemClick } = props;
  const container = Children.toArray(children)[0] as ReactElement;
  return (
    <ul>
      {Children.toArray(container.props.children).map((option, index) => (
        <li
          key={index}
          onClick={onItemClick}
          className={
            'group menu-option ' +
            (index == focusOn
              ? 'dark:text-dark dark:bg-white bg-neutral-200'
              : 'bg-white dark:bg-neutral-900 dark:hover:bg-neutral-800 hover:bg-neutral-200')
          }
        >
          {option}
        </li>
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
          className={`absolute translate-y-2 z-10 rounded-md shadow-3xl ${className}`}
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
