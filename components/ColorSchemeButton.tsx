import { FC } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/utils';

const ColorSchemeButton: FC<{ className?: string }> = ({ className }) => {
  const { setTheme } = useTheme();

  function toggleTheme() {
    const htmlElement = document.documentElement;
    htmlElement.classList.add('transition-off');

    const prefersDarkTheme = htmlElement.getAttribute('data-theme') == 'dark';
    setTheme(prefersDarkTheme ? 'light' : 'dark');

    // wait a few ms for transition-off to be applyed
    setTimeout(() => htmlElement.classList.remove('transition-off'), 99);
  }

  return (
    <button
      data-test="cs-button"
      className={cn('transition-inherit dark:toggle-on toggle toggle-sm w-10 border-2', className)}
      style={{ '--handleoffset': '1.25rem' } as any}
      onClick={toggleTheme}
    ></button>
  );
};

export default ColorSchemeButton;
