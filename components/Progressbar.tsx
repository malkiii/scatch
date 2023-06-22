import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion, Variants } from 'framer-motion';

const progressVariants: Variants = {
  initial: {
    opacity: 1
  },
  visible: {
    width: ['0%', '20%', '25%', '55%', '98%'],
    transition: {
      times: [0, 0.1, 0.3, 0.6, 1],
      duration: 10,
      type: 'tween'
    }
  },
  hidden: {
    width: '100%',
    opacity: 0,
    transition: {
      duration: 0.15,
      type: 'tween'
    }
  }
};

const staticPages = ['/', '/login', '/register', '/about', '/blog'];

const Progressbar: FC = () => {
  const router = useRouter();
  const [isChanging, setIsChanging] = useState(false);

  function handleChanging(url: string, { shallow }: any) {
    if (staticPages.includes(url) || shallow) return;
    setIsChanging(true);
  }

  function handleComleting() {
    setIsChanging(false);
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleChanging);
    router.events.on('routeChangeComplete', handleComleting);
    router.events.on('routeChangeError', handleComleting);
    return () => {
      router.events.off('routeChangeStart', handleChanging);
      router.events.off('routeChangeComplete', handleComleting);
      router.events.off('routeChangeError', handleComleting);
    };
  }, []);

  return (
    <AnimatePresence>
      {isChanging && (
        <div className="fixed left-0 top-0 z-[3333] h-1 w-full">
          <motion.div
            variants={progressVariants}
            initial="initial"
            animate="visible"
            exit="hidden"
            className="theme-gradient relative h-full"
          >
            <div className="absolute right-0 h-full w-28 -translate-y-1 rotate-3 shadow-progressbar shadow-theme"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default Progressbar;
