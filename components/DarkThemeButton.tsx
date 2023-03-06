import { FC } from 'react';
import { useTheme } from 'next-themes';

type ButtonProps = {
  containerClassName: string;
  buttonClassName: string;
};

export const DarkThemeButton: FC<ButtonProps> = props => {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    const newTheme = theme == 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  return (
    <button
      className={
        'group hover:text-theme transition-all duration-200 ' +
        props.containerClassName
      }
      onClick={toggleTheme}
    >
      dark
      <div
        className={
          'relative rounded-2xl after:absolute after:top-1/2 after:translate-y-[-48%] after:h-[90%] after:rounded-circle after:aspect-square group-hover:border-theme group-hover:after:bg-theme transition-inherit after:transition-inherit after:duration-500 border-2 dark:border-white border-dark dark:after:bg-white after:bg-dark dark:after:left-px after:left-[58%] ' +
          props.buttonClassName
        }
      ></div>
    </button>
  );
};
export default DarkThemeButton;
