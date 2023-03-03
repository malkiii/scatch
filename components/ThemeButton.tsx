import Link from 'next/link';
import { motion } from 'framer-motion';
import { FC, MouseEventHandler, ReactNode } from 'react';

type ButtonProps = {
  children?: ReactNode;
  text: string;
  href?: string;
  variants?: any;
  animate?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ThemeButton: FC<ButtonProps> = props => {
  const className = 'theme-btn before:-top-full ' + (props.className || '');
  function changeBackgroundPosition(e: any) {
    const button = e.currentTarget as HTMLAnchorElement;
    button.classList.toggle('before:-top-full');
    button.classList.toggle('before:-bottom-full');
  }

  if (props.href)
    return (
      <Link
        href={props.href || '/'}
        className={className}
        onMouseEnter={changeBackgroundPosition}
        onMouseLeave={changeBackgroundPosition}
      >
        <span className="relative font-bold z-10 pointer-events-none transition-all duration-300">
          {props.text}
        </span>
      </Link>
    );
  else
    return (
      <motion.button
        className={className}
        variants={props.variants}
        animate={props.animate}
        onMouseEnter={changeBackgroundPosition}
        onMouseLeave={changeBackgroundPosition}
        onClick={props.onClick}
      >
        <span className="relative font-bold z-10 pointer-events-none transition-all duration-300">
          {props.text}
          {props.children}
        </span>
      </motion.button>
    );
};
export default ThemeButton;
