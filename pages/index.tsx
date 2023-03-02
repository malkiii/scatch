import type { NextPage } from 'next';
import HeroSection from '../components/Home/HeroSection';
import ExploreSection from '../components/Home/ExploreSection';
import AlbumsSection from '../components/Home/AlbumsSection';
import EditingSection from '../components/Home/EditingSection';

const Home: NextPage = () => {
  return (
    <div className="px-8">
      <HeroSection />
      <ExploreSection />
      <AlbumsSection />
      <EditingSection />
    </div>
  );
};
export default Home;
