import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { useScrollingEvent } from '@/hooks/useScrollingEvent';

const buttonTransition = {
  duration: 0.7,
  ease: 'anticipate'
};

const buttonVariants = {
  hidden: {
    bottom: -112,
    transition: buttonTransition
  },
  visible: {
    bottom: 50,
    transition: buttonTransition
  }
};

const ScrollToTopButton: FC = () => {
  const isScrolling = useScrollingEvent(() => {
    return window.scrollY > 150;
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <AnimatePresence>
      {isScrolling && (
        <motion.button
          variants={buttonVariants}
          animate="visible"
          exit="hidden"
          className="theme-btn fixed -bottom-28 right-6 z-50 flex aspect-square translate-y-8 items-center justify-center rounded-circle text-white shadow-3xl dark:text-dark sm:translate-y-0"
          onClick={scrollToTop}
        >
          <AiOutlineArrowUp className="text-xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
export default ScrollToTopButton;
