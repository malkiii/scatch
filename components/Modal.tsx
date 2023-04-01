import { FC, ReactNode } from 'react';
import {
  IoIosArrowDroprightCircle as RightArrow,
  IoIosArrowDropleftCircle as LeftArrow
} from 'react-icons/io';

type modalFunction = () => void;
type ModalProps = {
  next?: modalFunction;
  prev?: modalFunction;
  close: modalFunction;
  children?: ReactNode;
};

function disableScrolling(ok: boolean) {
  const bodyClasses = document.body.classList;
  const classNames = ['pr-4', 'overflow-y-hidden'];

  classNames.forEach(className => {
    if (ok) bodyClasses.add(className);
    else bodyClasses.remove(className);
  });
}

export const Modal: FC<ModalProps> = ({ next, prev, close, children }) => {
  function handleClick(e: any) {
    const clickOutside = e.target === e.currentTarget;
    if (clickOutside) {
      disableScrolling(false);
      close();
    }
  }

  disableScrolling(true);

  return (
    <div
      onClick={handleClick}
      className="fixed px-40 top-0 left-0 z-[995] w-screen h-screen bg-dark/40 dark:bg-dark/60"
    >
      <div
        onClick={handleClick}
        className="absolute inset-0 flex items-center justify-between m-auto max-w-6xl"
      >
        <button onClick={prev} className="modal-arrow" disabled={!prev}>
          <LeftArrow />
        </button>
        {children}
        <button onClick={next} className="modal-arrow" disabled={!next}>
          <RightArrow />
        </button>
      </div>
    </div>
  );
};
