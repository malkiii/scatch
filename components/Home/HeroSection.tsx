import InfinitImageSlider from './InfinitImageSlider';

export default function HeroSection(): JSX.Element {
  return (
    <div className="py-20">
      <div className="text-center mx-auto max-w-5xl">
        <h1 className="text-7xl font-extrabold my-8">
          welcome to{' '}
          <span className="relative inline-block text-transparent bg-clip-text theme-gradient">
            Scatch
          </span>
        </h1>
        <p className="text-2xl font-rubik opacity-75 leading-relaxed mb-10">
          Scatch is an online image gallery were you can find your favored
          images and edit it, save it or download it for free with high
          resolusion.
        </p>
      </div>
      <InfinitImageSlider />
    </div>
  );
}
