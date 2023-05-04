import { FC, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { siteInfos } from '@/data/constants';
import { easeInOutExpo } from '@/utils/easing';
import { CgSearch as SearchIcon } from 'react-icons/cg';

const textVariants = {
  hidden: { y: 130, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      duration: 0.7,
      ease: easeInOutExpo
    }
  }
};

const inputVariants = {
  hidden: { width: '80px' },
  visible: {
    width: '100%',
    transition: {
      duration: 0.55,
      ease: easeInOutExpo
    }
  }
};

const SearchInput: FC = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  function triggerTheSearch() {
    const searchValue = inputRef.current?.value.trim();
    if (searchValue) {
      router.push({
        pathname: '/search/[query]',
        query: { query: searchValue }
      });
    }
  }
  function handleKeyDown({ key }: any) {
    if (key === 'Enter') triggerTheSearch();
  }

  return (
    <motion.div
      variants={inputVariants}
      className="relative text-lg flex mx-auto items-center rounded-3xl dark:bg-neutral-900/60 bg-white/80 shadow-xl transition-colors"
    >
      <div className="overflow-hidden w-full">
        <input
          type="search"
          ref={inputRef}
          placeholder="Search.."
          className="block w-full h-full outline-none bg-transparent py-2 px-4"
          onKeyDown={handleKeyDown}
          autoComplete="off"
          required
        />
      </div>
      <button
        className="theme-btn w-[90px] flex items-center py-2 rounded-inherit"
        onClick={() => triggerTheSearch()}
      >
        <SearchIcon size={30} className="block mx-auto" />
      </button>
    </motion.div>
  );
};

const HeroSection: FC = () => {
  return (
    <div className="relative py-20 md:py-44">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="max-w-5xl text-center mx-auto flex flex-col gap-y-6"
        >
          <motion.h1 variants={textVariants}>
            welcome to{' '}
            <span className="relative text-transparent bg-clip-text theme-gradient after:absolute after:h-1 after:theme-gradient after:w-full after:top-full after:left-0">
              {siteInfos.name}
            </span>
          </motion.h1>
          <motion.p
            variants={textVariants}
            className="text-xl sm:text-2xl sm:leading-[1.7] leading-[1.7] opacity-75"
          >
            {siteInfos.description}
          </motion.p>
          <motion.div
            variants={textVariants}
            className="w-full md:w-3/5 mx-auto"
          >
            <SearchInput />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
export default HeroSection;
