import type { NextPage } from 'next';
import { AlbumsSection, ExploreSection, HeroSection } from '@/components/Home';

const HomePage: NextPage = () => {
  return (
    <div className="relative h-[2400px] bg-base-100">
      <HeroSection />
      <div className="absolute bottom-0 h-2/3 w-full bg-base-content shadow-[0_-10px_70px_-40px_black]">
        <ExploreSection />
        <div className="absolute bottom-0 h-1/2 w-full bg-base-100 shadow-[0_-10px_70px_-30px_black]">
          <AlbumsSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
