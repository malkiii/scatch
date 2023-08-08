import { FC, HTMLAttributes } from 'react';
import { cn } from '@/utils';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  close: Function;
}
export const Modal: FC<InputProps> = ({ children, className, close, ...props }) => {
  return (
    <div
      onMouseDown={e => e.target === e.currentTarget && close()}
      className="fixed left-0 top-0 z-[2020] flex h-screen w-screen items-center bg-black/50 px-3 animate-in fade-in dark:bg-black/70"
    >
      <div
        {...props}
        className={cn('m-auto rounded-xl bg-white shadow-2xl dark:bg-neutral', className)}
      >
        {children}
      </div>
    </div>
  );
};
