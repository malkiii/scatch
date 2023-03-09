import Head from 'next/head';
import { NextPage, GetServerSideProps } from 'next';
import ImageLayout from '../../components/Search/ImageLayout';
import SearchSection from '../../components/Search/SearchSection';
import { useFetch, ResponseImage, fetchImages } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';

type Props = {
  query: string;
  images: ResponseImage[];
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = params!.query as string;
  const searchParams = new URLSearchParams({
    e: 'search',
    q: query
  });
  const images = await fetchImages(searchParams);
  return {
    props: { query, images, key: query }
  };
};

const SearchResults: NextPage<Props> = ({ query, images }) => {
  const imageArray = useFetch('search', query, images);
  useEffect(() => {}, []);
  return (
    <div className="px-8">
      <Head>
        <title>{query} images | Search and save in your albums</title>
      </Head>
      <SearchSection />
      <div className="max-w-[1250px] mx-auto mt-10">
        <ImageLayout images={imageArray} />
      </div>
    </div>
  );
};
export default SearchResults;
