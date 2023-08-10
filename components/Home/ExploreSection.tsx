import { FC, useState } from 'react';
import Head from 'next/head';
import TypeIt from 'typeit-react';
import { cn, getResizedImage } from '@/utils';
import { searchDemoImages } from '@/data/constants';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import AssetsPreloader from '../AssetsPreloader';

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
        getBeforeInit={instance => instance.pause(1500)}
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
                  src={getImageUrl(index)}
                  style={{ animationDelay: index * 15 + 'ms' }}
                  onAnimationStartCapture={e => e.currentTarget.classList.remove('opacity-0')}
                  className="w-full opacity-0 shadow-2xl animate-in fade-in slide-in-from-top-2 ease-linear"
                  alt="scatch image"
                />
              );
            })}
          </div>
        ))}
    </div>
  );
};

const ExploreSection: FC = () => {
  const [currentNameIndex, setCurrentNameIndex] = useState<number>(-1);

  const { targetRef, isInView } = useIntersectionObserver({ threshold: 2 / 3, once: true });
  const animate = isInView
    ? 'animate-in fade-in slide-in-from-bottom-10 duration-200'
    : 'opacity-0';

  function setNextNameIndex() {
    setCurrentNameIndex(currentNameIndex == searchNames.length - 1 ? 0 : currentNameIndex + 1);
  }

  return (
    <div ref={targetRef} className="h-[800px] px-8 py-20 text-base-100">
      <Head>
        <AssetsPreloader as="image" assets={imagesURLs.map(url => getResizedImage(url, 480))} />
      </Head>
      <div className={cn('text-center', animate)}>
        <h2 className="mb-4 text-3xl sm:text-4xl">Search for images in any language.</h2>
        <p className="mb-8 text-xl">
          On the explore page, you can search and save your favored images or download them with{' '}
          <span className="text-primary">100,000+</span> pictures.
        </p>
      </div>
      <div className={cn('mx-auto aspect-[600/480] max-w-[600px] delay-200', animate)}>
        <SearchDemoInput afterString={setNextNameIndex} />
        {isInView && <SearchDemoImageRender nameIndex={currentNameIndex} />}
      </div>
    </div>
  );
};

export default ExploreSection;
