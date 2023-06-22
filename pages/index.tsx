import type { NextPage } from 'next';
import { motion } from 'framer-motion';
import { AlbumsSection, EditingSection, ExploreSection, HeroSection } from '@/components/Home';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const MeshGradientBackground = () => {
  return (
    <motion.div
      style={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8, type: 'tween' } }}
      className="opacity-1 bg-mesh-grandient bg-white dark:bg-dark"
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
