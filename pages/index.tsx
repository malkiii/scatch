import type { NextPage } from 'next';
import { HeroSection } from '@/components/Home';

const HomePage: NextPage = () => {
  return (
    <div className="relative">
      <HeroSection />
    </div>
  );
};

export default HomePage;
