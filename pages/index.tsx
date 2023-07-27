import type { NextPage } from 'next';
import { AlbumsSection, ExploreSection, HeroSection } from '@/components/Home';

const HomePage: NextPage = () => {
  return (
    <div className="relative">
      <HeroSection />
      <div className="bg-base-content">
        <ExploreSection />
      </div>
      <AlbumsSection />
    </div>
  );
};

export default HomePage;
