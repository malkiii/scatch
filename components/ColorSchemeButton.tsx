import { FC, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/utils';

type ButtonProps = {
  containerClassName: string;
  buttonClassName: string;
  children?: ReactNode;
};

const ColorSchemeButton: FC<ButtonProps> = props => {
  const { setTheme } = useTheme();
  const { containerClassName, buttonClassName } = props;

  function toggleTheme() {
    const HtmlClasses = document.documentElement.classList;
    HtmlClasses.add('transition-off');

    const prefersDarkTheme = HtmlClasses.contains('dark');
    setTheme(prefersDarkTheme ? 'light' : 'dark');

    // wait a few ms for transition-off to be applyed and then remove it
    setTimeout(() => HtmlClasses.remove('transition-off'), 99);
  }

  return (
    <button
      data-test="cs-button"
      className={cn('group relative', containerClassName)}
      onClick={toggleTheme}
    >
      {props.children}

      <div className={cn('cs-button', buttonClassName)}></div>
    </button>
  );
};
export default ColorSchemeButton;
