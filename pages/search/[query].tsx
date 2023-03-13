import Head from 'next/head';
import { useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Dispatch, FC, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageLayout from '../../components/Search/ImageLayout';
import SearchSection from '../../components/Search/SearchSection';
import { useFetch, ResponseImage, fetchImages } from '../../hooks/useFetch';
import { BsAspectRatio } from 'react-icons/bs';
import ScrollToTopButton from '../../components/ScrollToTopButton';

type Props = {
  query: string;
  images: ResponseImage[];
  inLastPage: boolean;
};

type FilterMenuProps = {
  setOption: Dispatch<SetStateAction<string>>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = params!.query as string;
  const searchParams = new URLSearchParams({ e: 'search', q: query });
  const { newImages, inLastPage } = await fetchImages(searchParams);
  return {
    props: {
      query,
      images: newImages,
      inLastPage,
      key: query
    }
  };
};

const transition = { type: 'tween', duration: 0.1 };
const menuVarinats = {
  hidden: { opacity: 0, transition },
  visible: { opacity: 1, transition }
};

const FilterMenu: FC<FilterMenuProps> = ({ setOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  function toggleTheMenu() {
    setIsOpen(!isOpen);
  }

  const optionList = ['all', 'portrait', 'landscape'];
  function changeOptionTo(option: string) {
    setOption(option);
    toggleTheMenu();
  }
  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 border-2 p-2 rounded-md bg-white dark:bg-neutral-900 px-4 dark:border-white/40 dark:hover:border-white transition-colors group border-dark/40 hover:border-dark"
        onClick={toggleTheMenu}
      >
        Filter
        <MdKeyboardArrowDown
          size={22}
          className={
            'transition-all dark:text-white/40 dark:group-hover:text-white text-dark/40 group-hover:text-dark ' +
            (isOpen ? 'rotate-180' : '')
          }
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full translate-y-2 right-0 z-10 shadow-3xl"
            variants={menuVarinats}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ul>
              {optionList.map((option, index) => (
                <li
                  key={index}
                  className="filter-option group"
                  onClick={() => changeOptionTo(option)}
                >
                  {option != 'all' && (
                    <BsAspectRatio
                      className={option == 'portrait' ? 'rotate-90' : ''}
                    />
                  )}

                  {option}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SearchResults: NextPage<Props> = ({ query, images, inLastPage }) => {
  const hasResults = images.length > 0;
  const [option, setOption] = useState('all');
  const imageArray = useFetch('search', inLastPage, query, images, option);
  return (
    <>
      <Head>
        <title>{query} images | Search and save in your albums</title>
      </Head>
      <div className="px-8">
        <SearchSection value={query} />
        <div className="max-w-[1250px] mx-auto">
          {hasResults ? (
            <>
              <div className="flex items-center justify-between w-full mb-5">
                <h3 className="font-bold text-xl sm:text-2xl lg:text-4xl mb-5 first-letter:capitalize">
                  {query} images.
                </h3>
                <FilterMenu setOption={setOption} />
              </div>
              <ImageLayout images={imageArray} />
            </>
          ) : (
            <>
              <h3 className="text-2xl sm:text-3xl lg:text-5xl mb-5 first-letter:capitalize">
                No results for “{query}”.
              </h3>
              <p className="text-xl sm:text-2xl lg:text-4xl">
                Try another search.
              </p>
            </>
          )}
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
};
export default SearchResults;
