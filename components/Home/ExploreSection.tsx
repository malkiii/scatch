import { useState } from 'react';
import TypeIt from 'typeit-react';
import { searchDemoImages } from '../../constants';
import { motion } from 'framer-motion';

type SearchName = keyof typeof searchDemoImages;
const searchNames = Object.keys(searchDemoImages);

export default function ExploreSection() {
  const [currentNameIndex, setCurrentNameIndex] = useState<number>(-1);

  function getImageUrl(imageIndex: number) {
    return (
      searchDemoImages[searchNames[currentNameIndex] as SearchName][
        imageIndex
      ] + '?auto=compress&cs=tinysrgb&w=480'
    );
  }

  function setNextNameIndex() {
    setCurrentNameIndex(
      currentNameIndex == searchNames.length - 1 ? 0 : currentNameIndex + 1
    );
  }

  return (
    <div className="pb-20 pt-32">
      <div className="text-center">
        <h2>Explore and save your favored pictures.</h2>
        <p className="text-xl mb-8">
          On the explore page, you can search and save your favored images or
          download them with <span className="text-theme">10,000+</span>{' '}
          pictures.
        </p>
      </div>
      <div className="max-w-[600px] min-h-[500px] mx-auto">
        <div className="w-80 mb-4 py-2 px-3 border-theme border-2 rounded-lg mx-auto bg-neutral-600/5">
          <TypeIt
            options={{
              loop: true,
              breakLines: false,
              strings: searchNames,
              nextStringDelay: 3000,
              waitUntilVisible: true,
              afterString: setNextNameIndex
            }}
            getBeforeInit={instance => {
              instance.pause(1500);
              return instance;
            }}
          />
        </div>
        <div className="flex w-full gap-4">
          {currentNameIndex != -1 &&
            new Array(3).fill(null).map((_, col) => (
              <div key={col} className="relative flex flex-col w-1/3 gap-4">
                {new Array(2).fill(null).map((_, row) => {
                  const imageIndex = 2 * col + row;
                  const id = searchNames[currentNameIndex] + '-' + imageIndex;
                  return (
                    <motion.img
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'tween', delay: imageIndex / 50 }}
                      key={id}
                      alt={id}
                      className="w-full"
                      src={getImageUrl(imageIndex)}
                    />
                  );
                })}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
