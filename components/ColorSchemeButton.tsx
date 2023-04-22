import { FC, ReactNode } from 'react';
import { useTheme } from 'next-themes';

type ButtonProps = {
  className: string;
  children?: ReactNode;
};

const ColorSchemeButton: FC<ButtonProps> = ({ className, children }) => {
  const { setTheme } = useTheme();
  const buttonStyle =
    'group hover:text-theme transition-colors duration-200 ' + className;

  function toggleTheme() {
    const preferDarkTheme = document.documentElement.classList.contains('dark');
    setTheme(preferDarkTheme ? 'light' : 'dark');
  }

  return (
    <button data-test="cs-button" className={buttonStyle} onClick={toggleTheme}>
      {children}
      <span className="flex items-center mt-1 cs-icon"></span>
    </button>
  );
};
export default ColorSchemeButton;
