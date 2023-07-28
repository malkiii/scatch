import { FC, PropsWithChildren, useRef } from 'react';
import { IoIosArrowBack as LeftArrow, IoIosArrowForward as RightArrow } from 'react-icons/io';
import { cn } from '@/utils';

type ButtonSliderProps = PropsWithChildren<{
  scrollBy: number;
  className?: string;
}>;
const ButtonsSlider: FC<ButtonSliderProps> = ({ scrollBy, className, children }) => {
  const arrowSize = 20;
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'LEFT' | 'RIGHT') => {
    sliderRef.current!.scrollBy({
      left: direction == 'LEFT' ? -scrollBy : scrollBy,
      behavior: 'smooth'
    });
  };

  const hideScrollButtons = () => {
    const wrapper = sliderRef.current!;
    const scrollX = wrapper.scrollLeft;
    const isOnWrapperStart = scrollX == 0;
    const isOnWrapperEnd = scrollX >= wrapper.scrollWidth - wrapper.offsetWidth;

    const leftButton = wrapper.querySelector('[data-slider="left"]') as HTMLButtonElement;
    const rightButton = wrapper.querySelector('[data-slider="right"]') as HTMLButtonElement;

    leftButton.style.display = isOnWrapperStart ? 'none' : '';
    rightButton.style.display = isOnWrapperEnd ? 'none' : '';
  };

  return (
    <div ref={sliderRef} onScroll={hideScrollButtons} className="w-full overflow-x-hidden">
      {children}
      <div
        data-slider="left"
        style={{ display: 'none' }}
        className={cn(
          'absolute left-0 top-0 z-50 flex h-full w-16 items-center justify-center bg-gradient-to-r to-transparent',
          className
        )}
      >
        <button
          onClick={() => scroll('LEFT')}
          className="rounded-circle p-2 transition-colors hover:bg-base-content/20"
        >
          <LeftArrow size={arrowSize} />
        </button>
      </div>
      <div
        data-slider="right"
        className={cn(
          'absolute right-0 top-0 z-50 flex h-full w-16 items-center justify-center bg-gradient-to-l to-transparent',
          className
        )}
      >
        <button
          onClick={() => scroll('RIGHT')}
          className="rounded-circle p-2 transition-colors hover:bg-base-content/20"
        >
          <RightArrow size={arrowSize} />
        </button>
      </div>
    </div>
  );
};

export default ButtonsSlider;
