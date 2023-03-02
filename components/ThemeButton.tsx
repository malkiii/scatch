import Link from 'next/link';
import { FC } from 'react';

type ButtonProps = {
  text: string;
  href?: string;
  className?: string;
};

const ThemeButton: FC<ButtonProps> = props => {
  function changeBackgroundPosition(e: any) {
    const button = e.currentTarget as HTMLAnchorElement;
    button.classList.toggle('before:-top-full');
    button.classList.toggle('before:-bottom-full');
  }

  return (
    <Link
      href={props.href || '/'}
      className={'theme-btn before:-top-full ' + (props.className || '')}
      onMouseEnter={changeBackgroundPosition}
      onMouseLeave={changeBackgroundPosition}
    >
      <span className="relative font-bold z-10 pointer-events-none transition-all duration-300">
        {props.text}
      </span>
    </Link>
  );
};
export default ThemeButton;
