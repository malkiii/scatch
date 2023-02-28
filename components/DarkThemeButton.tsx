import { useState } from 'react';

type ButtonProps = {
  containerClassName: string;
  buttonClassName: string;
};

export default function DarkThemeButton(props: ButtonProps): JSX.Element {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  function toggleDarkTheme() {
    setDarkTheme(!darkTheme);
  }

  return (
    <button
      className={
        'group hover:text-theme transition-all duration-200 ' +
        props.containerClassName
      }
      onClick={toggleDarkTheme}
    >
      dark
      <div
        className={
          'relative rounded-2xl after:absolute after:top-1/2 after:translate-y-[-48%] after:left-px after:h-[90%] after:rounded-circle after:aspect-square group-hover:border-theme group-hover:after:bg-theme transition-inherit after:transition-inherit border-2 border-white after:bg-white ' +
          props.buttonClassName
        }
      ></div>
    </button>
  );
}
