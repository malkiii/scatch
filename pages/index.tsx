import type { NextPage } from 'next';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { motion } from 'framer-motion';
import {
  HeroSection,
  ExploreSection,
  AlbumsSection,
  EditingSection
} from '@/components/Home';

const MeshGradientBackground = () => {
  return (
    <motion.div
      style={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8, type: 'tween' } }}
      className="opacity-1 bg-mesh-grandient dark:bg-dark bg-white"
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
