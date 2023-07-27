import { FC } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { cn } from '@/utils';
import { useScrollEvent } from '@/hooks/useScrollEvent';

const ScrollToTopButton: FC = () => {
  const isScrolling = useScrollEvent(() => window.scrollY > 150);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'theme-btn no-animation fixed left-[calc(100vw-7rem)] z-50 flex h-16 w-16 items-center justify-center rounded-circle px-4 shadow-2xl transition-[bottom,_background-color] ease-in-out-back',
        isScrolling ? 'bottom-8 sm:bottom-14' : '-bottom-16'
      )}
      style={{ transitionDuration: '0.5s, 200ms' }}
    >
      <AiOutlineArrowUp size={22} />
    </button>
  );
};

export default ScrollToTopButton;
