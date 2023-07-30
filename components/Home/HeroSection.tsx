import { FC } from 'react';
import Image from 'next/image';
import { CgSearch as SearchIcon } from 'react-icons/cg';
import { cn, removeClassNames } from '@/utils';
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
  const illustrations = {
    cube: { width: 410, height: 406 },
    pill: { width: 286, height: 445 }
  };

  const getIllustrationPath = (name: string) => `/assets/3d/${name}.svg`;

  const objects = [
    {
      name: 'cube',
      props: {
        className: 'left-20 top-0 w-[360px]',
        priority: true,
        ...illustrations['cube']
      }
    },
    {
      name: 'pill',
      props: {
        className: 'right-60 top-20 w-[210px]',
        priority: true,
        ...illustrations['pill']
      }
    },
    {
      name: 'pill',
      props: {
        className: 'bottom-10 left-[33rem] w-[140px] -scale-x-100 rotate-180',
        priority: false,
        ...illustrations['pill']
      }
    }
  ];

  return (
    <div className="relative mx-auto h-[590px] w-[1200px] animate-in fade-in duration-500">
      {objects.map(({ name, props: { className, width, height, priority } }, index) => (
        <div
          key={index}
          style={{ aspectRatio: width + '/' + height }}
          className={cn('flip-effect dark:back absolute', className)}
        >
          <div className="layer">
            <Image
              alt={name}
              className="front"
              src={getIllustrationPath(`${name}-light`)}
              priority={priority}
              fill
            />
            <Image
              alt={name}
              className="back"
              src={getIllustrationPath(`${name}-dark`)}
              priority={priority}
              fill
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const HeroSection: FC = () => {
  const { targetRef, isInView } = useIntersectionObserver({ once: true });
  const animationClassNames = 'animate-in fade-in slide-in-from-bottom-7 duration-200';
  const showElement = (e: any) => removeClassNames(e.currentTarget, 'opacity-0');

  return (
    <div
      ref={targetRef}
      className="relative flex h-[760px] items-center overflow-hidden from-base-300 to-transparent dark:bg-gradient-to-b"
    >
      {isInView && <Illustrations />}
      <div className="absolute top-1/2 z-10 w-full -translate-y-1/2 px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto flex max-w-6xl flex-col gap-y-6 text-center">
            <h1
              onAnimationStartCapture={showElement}
              className={cn('text-5xl opacity-0 sm:text-6xl', {
                [cn(animationClassNames, 'delay-150')]: isInView
              })}
            >
              Search and Save images in your{' '}
              <span className="bg-gradient-to-br from-primary to-primary-focus bg-clip-text pr-1 text-transparent">
                albums
              </span>
            </h1>
            <p
              onAnimationStartCapture={showElement}
              className={cn('text-lg leading-[1.7] opacity-0 sm:text-2xl sm:leading-[1.7]', {
                [cn(animationClassNames, 'delay-300')]: isInView
              })}
            >
              {siteInfos.description}
            </p>
            <div
              onAnimationStartCapture={showElement}
              className={cn('mx-auto w-full opacity-0 md:w-3/5', {
                [cn(animationClassNames, 'delay-500')]: isInView
              })}
            >
              <SearchInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
