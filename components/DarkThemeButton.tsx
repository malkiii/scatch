import { FC, ReactNode } from 'react';
import { useTheme } from 'next-themes';

type ButtonProps = {
  className: string;
  children?: ReactNode;
};

const DarkThemeButton: FC<ButtonProps> = ({ className, children }) => {
  const { setTheme } = useTheme();

  function toggleTheme() {
    const preferDarkTheme = document.documentElement.classList.contains('dark');
    setTheme(preferDarkTheme ? 'light' : 'dark');
  }

  return (
    <button
      className={
        'group hover:text-theme transition-colors duration-200 ' + className
      }
      onClick={toggleTheme}
    >
      {children}
      <div className="relative before:inline-block before:font-theme before:not-italic before:antialiased before:aspect-square before:font-normal before:content-dark dark:before:content-light before:mt-1"></div>
    </button>
  );
};
export default DarkThemeButton;
