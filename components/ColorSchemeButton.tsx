import { FC, ReactNode } from 'react';
import { useTheme } from 'next-themes';

type ButtonProps = {
  containerClassName: string;
  buttonClassName: string;
  children?: ReactNode;
};

const ColorSchemeButton: FC<ButtonProps> = props => {
  const { setTheme } = useTheme();
  const buttonStyle = 'relative group ' + props.containerClassName;

  function toggleTheme() {
    const preferDarkTheme = document.documentElement.classList.contains('dark');
    setTheme(preferDarkTheme ? 'light' : 'dark');
  }

  return (
    <button data-test="cs-button" className={buttonStyle} onClick={toggleTheme}>
      {props.children}
      <div className={'cs-button ' + props.buttonClassName}></div>
    </button>
  );
};
export default ColorSchemeButton;
