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
  const styleProps = {
    className,
    onMouseEnter: changeBackgroundPosition,
    onMouseLeave: changeBackgroundPosition
  };
  const buttonContent = (
    <span className="relative font-bold z-10 pointer-events-none transition-all duration-300">
      {props.text}
      {props.children}
    </span>
  );

  function changeBackgroundPosition(e: any) {
    const button = e.currentTarget as HTMLAnchorElement;
    button.classList.toggle('before:-top-full');
    button.classList.toggle('before:-bottom-full');
  }

  if (props.href)
    return (
      <Link href={props.href || '/'} {...styleProps}>
        {buttonContent}
      </Link>
    );
  else
    return (
      <motion.button
        variants={props.variants}
        animate={props.animate}
        onClick={props.onClick}
        {...styleProps}
      >
        {buttonContent}
      </motion.button>
    );
};
export default ThemeButton;
