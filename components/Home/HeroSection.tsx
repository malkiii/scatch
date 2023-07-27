import { FC } from 'react';
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

const HeroSection: FC = () => {
  const { targetRef, isInView } = useIntersectionObserver({ once: true });
  const animationClassNames = 'animate-in fade-in slide-in-from-bottom-7 duration-200';
  const showElement = (e: any) => removeClassNames(e.currentTarget, 'opacity-0');

  return (
    <div
      ref={targetRef}
      className="mb-4 h-[760px] overflow-hidden from-base-300 to-transparent px-8 pt-36 dark:bg-gradient-to-b md:pt-64"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 flex max-w-6xl flex-col gap-y-6 text-center">
          <h1
            onAnimationStartCapture={showElement}
            className={cn('text-5xl opacity-0 sm:text-6xl', {
              [animationClassNames]: isInView
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
              [cn(animationClassNames, 'delay-150')]: isInView
            })}
          >
            {siteInfos.description}
          </p>
          <div
            onAnimationStartCapture={showElement}
            className={cn('mx-auto w-full opacity-0 md:w-3/5', {
              [cn(animationClassNames, 'delay-300')]: isInView
            })}
          >
            <SearchInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
