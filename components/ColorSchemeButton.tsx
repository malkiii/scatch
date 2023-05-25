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
    const HtmlClasses = document.documentElement.classList;
    HtmlClasses.add('transition-off');

    const prefersDarkTheme = HtmlClasses.contains('dark');
    setTheme(prefersDarkTheme ? 'light' : 'dark');

    // wait a few ms for transition-off to be applyed and then remove it
    setTimeout(() => HtmlClasses.remove('transition-off'), 99);
  }

  return (
    <button data-test="cs-button" className={buttonStyle} onClick={toggleTheme}>
      {props.children}
      <div className={'cs-button ' + props.buttonClassName}></div>
    </button>
  );
};
export default ColorSchemeButton;
