import type { NextPage } from 'next';
import Footer from '../components/Footer';
import HeroSection from '../components/Home/HeroSection';
import ExploreSection from '../components/Home/ExploreSection';
import AlbumsSection from '../components/Home/AlbumsSection';
import EditingSection from '../components/Home/EditingSection';
import ScrollToTopButton from '../components/ScrollToTopButton';

const Home: NextPage = () => {
  return (
    <>
      <div className="px-8">
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
export default Home;
