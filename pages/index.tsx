import type { NextPage } from 'next';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import {
  HeroSection,
  ExploreSection,
  AlbumsSection,
  EditingSection
} from '../components/Home';

const HomePage: NextPage = () => {
  return (
    <>
      <div className="px-8 overflow-x-hidden">
        <HeroSection />
        <ExploreSection />
        <AlbumsSection />
        <EditingSection />
        <ScrollToTopButton />
      </div>
      <Footer />
    </>
  );
};
export default HomePage;
