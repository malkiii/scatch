import Link from 'next/link';

type ButtonProps = {
  text: string;
  href?: string;
  className?: string;
};

export default function ThemeButton(props: ButtonProps) {
  function changeBackgroundPosition(e: any) {
    const button = e.currentTarget as HTMLAnchorElement;
    button.classList.toggle('before:-top-full');
    button.classList.toggle('before:-bottom-full');
  }

  return (
    <Link
      href={props.href || '/'}
      className={
        'text-dark bg-white rounded-3xl px-6 py-3 theme-btn before:-top-full ' +
        (props.className || '')
      }
      onMouseEnter={changeBackgroundPosition}
      onMouseLeave={changeBackgroundPosition}
    >
      <span className="relative font-bold z-10 pointer-events-none transition-all duration-300">
        {props.text}
      </span>
    </Link>
  );
}
