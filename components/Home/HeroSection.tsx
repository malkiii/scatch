import { FC, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { CgSearch as SearchIcon } from 'react-icons/cg';
import { cn } from '@/utils';
import { siteInfos } from '@/data/constants';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSearchTrigger } from '@/hooks/useSearchTrigger';

const SearchInput: FC = () => {
  const { inputRef, triggerTheSearch, handleEnter } = useSearchTrigger();
  return (
    <div className="relative mx-auto flex items-center gap-x-3">
      <input
        type="search"
        ref={inputRef}
        placeholder="Search.."
        className="theme-input h-full px-4 py-2 shadow-xl"
        onKeyDown={handleEnter}
        autoComplete="off"
        autoFocus
        required
      />
      <button
        className="theme-btn px-4 py-2 shadow-xl"
        onClick={async () => await triggerTheSearch()}
      >
        <SearchIcon size={30} />
      </button>
    </div>
  );
};

const Illustrations: FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasMouseEvent = window.matchMedia('(hover: hover)').matches;
    const parentContainer = containerRef.current?.parentElement;

    if (!hasMouseEvent || !parentContainer) return;

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.pageX, y: event.pageY });
    };

    parentContainer.addEventListener('mousemove', handleMouseMove);
    return () => parentContainer.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getIllustrationPath = (name: string) => `/assets/3d/${name}.svg`;

  const objects = useMemo(() => {
    const illustrations = {
      cube: { width: 410, height: 406 },
      pill: { width: 286, height: 445 }
    };

    const x = mousePosition.x / 10;
    const y = mousePosition.y / 10;

    return [
      {
        name: 'cube',
        props: {
          style: { translate: `${x * 1}px ${y * 2}px` },
          className: 'left-20 top-0 w-[360px]',
          priority: true,
          ...illustrations['cube']
        }
      },
      {
        name: 'pill',
        props: {
          style: { translate: `${x * -2}px ${y * -2}px` },
          className: 'left-[45rem] top-20 w-[210px]',
          priority: true,
          ...illustrations['pill']
        }
      },
      {
        name: 'pill',
        props: {
          style: { translate: `${x * -2}px ${y * 1}px` },
          className: 'bottom-0 left-[25rem] w-[140px] -scale-x-100 rotate-180',
          priority: false,
          ...illustrations['pill']
        }
      },
      {
        name: 'cube',
        props: {
          style: { translate: `${x * -1}px ${y * -2}px` },
          className: 'right-20 -bottom-10 w-[280px] -scale-x-100 rotate-[190deg]',
          priority: true,
          ...illustrations['cube']
        }
      }
    ];
  }, [mousePosition]);

  return (
    <div ref={containerRef} className="relative mx-auto h-[590px] w-[1200px]">
      {objects.map(({ name, props: { className, ...props } }, index) => (
        <div key={index} className="pointer-events-none select-none">
          <Image
            alt={name}
            className={cn(
              'absolute transition-[translate] duration-700 ease-out dark:hidden',
              className
            )}
            src={getIllustrationPath(`${name}-light`)}
            {...props}
          />
          <Image
            alt={name}
            className={cn(
              'absolute hidden transition-[translate] duration-700 ease-out dark:block',
              className
            )}
            src={getIllustrationPath(`${name}-dark`)}
            {...props}
          />
        </div>
      ))}
    </div>
  );
};

const HeroSection: FC = () => {
  const { targetRef, isInView } = useIntersectionObserver({ once: true });
  const animate = isInView ? 'animate-in fade-in slide-in-from-bottom-7 duration-200' : 'opacity-0';

  return (
    <div
      ref={targetRef}
      className={cn(
        'relative flex h-[760px] items-center overflow-hidden from-base-300 to-transparent dark:bg-gradient-to-b',
        isInView ? 'animate-in fade-in duration-500' : 'opacity-0'
      )}
    >
      <Illustrations />
      <div className="absolute top-1/2 z-10 w-full -translate-y-1/2 px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto flex max-w-6xl flex-col gap-y-6 text-center">
            <h1 className={cn('text-5xl delay-150 sm:text-6xl', animate)}>
              Search and Save images in your{' '}
              <span className="bg-gradient-to-br from-primary to-primary-focus bg-clip-text pr-1 text-transparent">
                albums
              </span>
            </h1>
            <p className={cn('text-lg delay-300 sm:text-2xl', animate)}>{siteInfos.description}</p>
            <div className={cn('mx-auto w-full delay-500 md:w-3/5', animate)}>
              <SearchInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
