import type { NextPage } from 'next';
import ScrollToTopButton from '@components/ScrollToTopButton';
import {
  HeroSection,
  ExploreSection,
  AlbumsSection,
  EditingSection
} from '@components/Home';

const HomePage: NextPage = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full min-h-screen -z-10 mesh-grandient"></div>
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
