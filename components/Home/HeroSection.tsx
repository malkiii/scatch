import { FC } from 'react';
import { siteInfos } from '@/data/constants';
import { easeExpInOut } from '@malkiii/d3-ease';
import { motion } from 'framer-motion';
import { CgSearch as SearchIcon } from 'react-icons/cg';
import { useSearchTrigger } from '@/hooks/useSearchTrigger';

const textVariants = {
  hidden: { y: 130, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      duration: 0.7,
      ease: easeExpInOut
    }
  }
};

const inputVariants = {
  hidden: { width: '80px' },
  visible: {
    width: '100%',
    transition: {
      duration: 0.55,
      ease: easeExpInOut
    }
  }
};

const SearchInput: FC = () => {
  const { inputRef, triggerTheSearch, handleEnter } = useSearchTrigger();

  return (
    <motion.div
      variants={inputVariants}
      className="relative mx-auto flex items-center rounded-3xl bg-white/80 text-lg shadow-xl transition-colors dark:bg-neutral-900/60"
    >
      <div className="w-full overflow-hidden">
        <input
          type="search"
          ref={inputRef}
          placeholder="Search.."
          className="block h-full w-full bg-transparent px-4 py-2 outline-none"
          onKeyDown={handleEnter}
          autoComplete="off"
          autoFocus
          required
        />
      </div>
      <button
        className="theme-btn flex w-[90px] items-center rounded-inherit py-2"
        onClick={async () => await triggerTheSearch()}
      >
        <SearchIcon size={30} className="mx-auto block" />
      </button>
    </motion.div>
  );
};

const HeroSection: FC = () => {
  return (
    <div className="relative mt-20 py-20 md:py-44">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="mx-auto flex max-w-5xl flex-col gap-y-6 text-center"
        >
          <motion.h1 variants={textVariants}>
            welcome to{' '}
            <span className="theme-gradient after:theme-gradient relative bg-clip-text text-transparent after:absolute after:left-0 after:top-full after:h-1 after:w-full">
              {siteInfos.name}
            </span>
          </motion.h1>
          <motion.p
            variants={textVariants}
            className="text-xl leading-[1.7] opacity-75 sm:text-2xl sm:leading-[1.7]"
          >
            {siteInfos.description}
          </motion.p>
          <motion.div variants={textVariants} className="mx-auto w-full md:w-3/5">
            <SearchInput />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
export default HeroSection;
