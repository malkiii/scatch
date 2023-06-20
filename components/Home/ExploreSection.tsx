import Head from 'next/head';
import TypeIt from 'typeit-react';
import { useState, FC } from 'react';
import { motion } from 'framer-motion';
import { getResizedImage } from '@/utils';
import { easeExpOut } from '@malkiii/d3-ease';
import { searchDemoImages } from '@/data/constants';

const searchNames = Object.keys(searchDemoImages);
const imagesURLs = new Array<string>().concat(...Object.values(searchDemoImages));

type DemoInputProps = {
  afterString: Function;
};

const SearchDemoInput: FC<DemoInputProps> = ({ afterString }) => {
  return (
    <div className="mx-auto mb-4 h-11 w-2/3 rounded-3xl border-2 border-theme bg-neutral-50/50 px-3 py-2 dark:bg-neutral-800/40 sm:w-80">
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

const conntainerVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easeExpOut
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      delay: i / 50
    }
  })
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
                <motion.img
                  key={id}
                  custom={index}
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full shadow-3xl"
                  src={getImageUrl(index)}
                  alt="scatch image"
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

  function setNextNameIndex() {
    setCurrentNameIndex(currentNameIndex == searchNames.length - 1 ? 0 : currentNameIndex + 1);
  }

  return (
    <>
      <ImagePreloader />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.1 }}
        className="py-24"
      >
        <motion.div variants={conntainerVariants} className="text-center">
          <h2>Search for images in any language.</h2>
          <p className="mb-8 text-xl">
            On the explore page, you can search and save your favored images or download them with{' '}
            <span className="text-theme">10,000+</span> pictures.
          </p>
        </motion.div>
        <motion.div
          variants={conntainerVariants}
          className="mx-auto aspect-[600/510] max-w-[600px]"
        >
          <SearchDemoInput afterString={setNextNameIndex} />
          <SearchDemoImageRender nameIndex={currentNameIndex} />
        </motion.div>
      </motion.div>
    </>
  );
};
export default ExploreSection;
