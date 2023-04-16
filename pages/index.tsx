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
    <div>
      <div className="fixed inset-0 -z-10 mesh-grandient"></div>
      <div className="px-8 overflow-x-hidden">
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
