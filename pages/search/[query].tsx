import Head from 'next/head';
import { NextPage, GetServerSideProps } from 'next';
import ImageLayout from '../../components/Search/ImageLayout';
import SearchSection from '../../components/Search/SearchSection';
import { useFetch, ResponseImage, fetchImages } from '../../hooks/useFetch';

type Props = {
  query: string;
  images: ResponseImage[];
  inLastPage: boolean;
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

const SearchResults: NextPage<Props> = ({ query, images, inLastPage }) => {
  const hasResults = images.length > 0;
  const imageArray = useFetch('search', inLastPage ? -1 : 1, query, images);
  return (
    <>
      <Head>
        <title>{query} images | Search and save in your albums</title>
      </Head>
      <div className="px-8">
        <SearchSection value={query} />
        <div className="max-w-[1250px] mx-auto">
          <h3 className="text-2xl sm:text-3xl lg:text-5xl mb-5 first-letter:capitalize">
            {hasResults ? `${query} images` : `No results for “${query}”`}.
          </h3>
          {!hasResults && (
            <p className="text-xl sm:text-2xl lg:text-4xl">
              Try another search.
            </p>
          )}
          {imageArray.length > 0 && <ImageLayout images={imageArray} />}
        </div>
      </div>
    </>
  );
};
export default SearchResults;
