import { FC, ReactNode } from 'react';
import { useTheme } from 'next-themes';

type ButtonProps = {
  containerClassName: string;
  buttonClassName: string;
  children?: ReactNode;
};

const ColorSchemeButton: FC<ButtonProps> = props => {
  const { setTheme } = useTheme();
  const buttonStyle =
    'relative group hover:text-theme transition-colors duration-200 ' +
    props.containerClassName;

  function toggleTheme() {
    const preferDarkTheme = document.documentElement.classList.contains('dark');
    setTheme(preferDarkTheme ? 'light' : 'dark');
  }

  return (
    <button data-test="cs-button" className={buttonStyle} onClick={toggleTheme}>
      Dark
      <div
        className={
          'relative rounded-2xl after:absolute after:top-1/2 after:translate-y-[-48%] after:h-[90%] after:rounded-circle after:aspect-square group-hover:border-theme group-hover:after:bg-theme transition-inherit after:transition-inherit after:duration-500 border-2 dark:border-white border-dark dark:after:bg-white after:bg-dark dark:after:left-px after:left-[57%] ' +
          props.buttonClassName
        }
      ></div>
    </button>
  );
};
export default ColorSchemeButton;
