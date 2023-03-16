import { FC } from 'react';
import { useTheme } from 'next-themes';

type ButtonProps = {
  containerClassName: string;
  buttonClassName: string;
};

const DarkThemeButton: FC<ButtonProps> = props => {
  const { setTheme } = useTheme();
  function toggleTheme() {
    const preferDarkTheme = document.documentElement.classList.contains('dark');
    setTheme(preferDarkTheme ? 'light' : 'dark');
  }

  return (
    <button
      className={
        'group hover:text-theme transition-colors duration-200 ' +
        props.containerClassName
      }
      onClick={toggleTheme}
    >
      dark
      <div
        className={
          'relative flex items-center rounded-2xl group-hover:border-theme transition-inherit border-2 dark:border-white border-dark  p-[2px] ' +
          props.buttonClassName
        }
      >
        <div className="h-full aspect-square rounded-circle bg-dark dark:bg-white group-hover:bg-theme transition-inherit ml-auto dark:ml-0"></div>
      </div>
    </button>
  );
};
export default DarkThemeButton;
