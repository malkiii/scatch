import InfinitImageSlider from './InfinitImageSlider';

export default function HeroSection(): JSX.Element {
  return (
    <div className="py-20">
      <div className="text-center mx-auto max-w-5xl">
        <h1 className="my-8">
          welcome to{' '}
          <span className="relative inline-block text-transparent bg-clip-text theme-gradient">
            Scatch
          </span>
        </h1>
        <p className="text-2xl leading-relaxed mb-10 opacity-75">
          Scatch is an online image gallery where you can find your favored
          images and edit, save, or download them for free with high resolution.
        </p>
      </div>
      <InfinitImageSlider />
    </div>
  );
}
