import ImageContainer from './ImageContainer';

export default function HeroSection(): JSX.Element {
  return (
    <div className="py-20 px-8 overflow-hidden">
      <div className="flex justify-center items-center gap-8 mx-auto max-w-7xl">
        <div className="w-1/2">
          <h1 className="my-4">
            welcome to{' '}
            <span className="relative inline-block text-transparent bg-clip-text theme-gradient">
              Scatch
            </span>
          </h1>
          <p className="text-2xl leading-relaxed mb-8 opacity-75">
            Scatch is an online image gallery where you can find your favored
            images and edit, save, or download them for free with high
            resolution.
          </p>
        </div>
        <ImageContainer />
      </div>
    </div>
  );
}
