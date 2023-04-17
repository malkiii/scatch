import type { NextPage } from 'next';
import ScrollToTopButton from '@components/ScrollToTopButton';
import { motion } from 'framer-motion';
import {
  HeroSection,
  ExploreSection,
  AlbumsSection,
  EditingSection
} from '@components/Home';

const MeshGradientBackground = () => {
  return (
    <motion.div
      animate={{ opacity: 1, transition: { duration: 0.8, type: 'tween' } }}
      className="fixed dark:bg-dark bg-white opacity-0 top-0 left-0 w-full min-h-screen -z-10 mesh-grandient"
    ></motion.div>
  );
};

const HomePage: NextPage = () => {
  return (
    <div className="overflow-x-hidden">
      <MeshGradientBackground />
      <div className="px-8">
        <HeroSection />
        <ExploreSection />
        <AlbumsSection />
        <EditingSection />
        <ScrollToTopButton />
      </div>
    </div>
  );
};
export default HomePage;
