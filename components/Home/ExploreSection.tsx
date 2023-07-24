import { FC, useState } from 'react';
import Head from 'next/head';
import { searchDemoImages } from '@/data/constants';
import TypeIt from 'typeit-react';
import { cn, getResizedImage, removeClassNames } from '@/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const searchNames = Object.keys(searchDemoImages);
const imagesURLs = new Array<string>().concat(...Object.values(searchDemoImages));

type DemoInputProps = {
  afterString: Function;
};

const SearchDemoInput: FC<DemoInputProps> = ({ afterString }) => {
  return (
    <div className="mx-auto mb-4 h-11 w-2/3 rounded-xl border-2 border-primary px-3 py-2 shadow-xl sm:w-80">
      <TypeIt
        options={{
          loop: true,
          breakLines: false,
          strings: searchNames,
          nextStringDelay: 2800,
          waitUntilVisible: true,
          afterString
        }}
        getBeforeInit={instance => {
          instance.pause(1500);
          return instance;
        }}
      />
    </div>
  );
};

type SearchDemoImagesProps = {
  nameIndex: number;
};
const SearchDemoImageRender: FC<SearchDemoImagesProps> = ({ nameIndex }) => {
  function getImageUrl(index: number) {
    const imagesPerName = imagesURLs.length / searchNames.length;
    const imageIndex = index + nameIndex * imagesPerName;
    return getResizedImage(imagesURLs[imageIndex], 480);
  }

  return (
    <div className="flex w-full gap-2 sm:gap-4">
      {nameIndex != -1 &&
        new Array(3).fill(null).map((_, col) => (
          <div key={col} className="relative flex w-1/3 flex-col gap-2 sm:gap-4">
            {new Array(2).fill(null).map((_, row) => {
              const index = col * 2 + row;
              const id = searchNames[nameIndex] + '-' + index;
              return (
                <img
                  key={id}
                  className="w-full shadow-2xl animate-in fade-in slide-in-from-top-2 ease-linear paused"
                  src={getImageUrl(index)}
                  alt="scatch image"
                  onAnimationStartCapture={e => {
                    const image = e.currentTarget;
                    setTimeout(() => image.classList.remove('paused'), index * 15);
                  }}
                />
              );
            })}
          </div>
        ))}
    </div>
  );
};

const ImagePreloader: FC = () => {
  return (
    <Head>
      {imagesURLs.map((url, index) => (
        <link key={index} rel="preload" as="image" href={getResizedImage(url, 480)} />
      ))}
    </Head>
  );
};

const ExploreSection: FC = () => {
  const [currentNameIndex, setCurrentNameIndex] = useState<number>(-1);
  const { targetRef, isInView } = useIntersectionObserver({ threshold: 3 / 5, once: true });
  const animationClassNames = 'animate-in fade-in slide-in-from-bottom-10 duration-200';
  const showElement = (e: any) => removeClassNames(e.currentTarget, 'opacity-0');

  function setNextNameIndex() {
    setCurrentNameIndex(currentNameIndex == searchNames.length - 1 ? 0 : currentNameIndex + 1);
  }

  return (
    <div ref={targetRef} className="sticky top-0 h-[760px] px-8 py-20 text-base-100">
      <ImagePreloader />
      <div
        onAnimationStartCapture={showElement}
        className={cn('text-center opacity-0', { [animationClassNames]: isInView })}
      >
        <h2 className="mb-4 text-3xl sm:text-4xl">Search for images in any language.</h2>
        <p className="mb-8 text-xl">
          On the explore page, you can search and save your favored images or download them with{' '}
          <span className="text-primary">100,000+</span> pictures.
        </p>
      </div>
      <div
        onAnimationStartCapture={showElement}
        className={cn('mx-auto aspect-[600/480] max-w-[600px] opacity-0', {
          [cn(animationClassNames, 'delay-200')]: isInView
        })}
      >
        <SearchDemoInput afterString={setNextNameIndex} />
        <SearchDemoImageRender nameIndex={currentNameIndex} />
      </div>
    </div>
  );
};

export default ExploreSection;
