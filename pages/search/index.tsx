import Head from 'next/head';
import { ResponseImage } from '@/types';
import { fetchImages } from '@/utils/fetchImages';
import { PulseAnimation } from '@/components/Loading';
import { useInfinitScroll } from '@/hooks/useInfinitScroll';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { SearchInput, SearchKeywords, ImageGridLayout } from '@/components/Search';

type Props = {
  images: ResponseImage[];
  hasMore: boolean;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ res }) => {
  const searchParams = { e: 'curated' };
  res.setHeader('Cache-Control', 's-maxage=1200, stale-while-revalidate=600');
  const data = await fetchImages(searchParams);

  return { props: data };
};

const SearchPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = props => {
  const params = {
    endpoint: 'curated',
    initialImages: props.images,
    hasMore: props.hasMore
  };

  const { images, hasMore } = useInfinitScroll(params);

  return (
    <div>
      <Head>
        <title>Search for images</title>
      </Head>
      <SearchInput />
      <div className="main-container mb-7">
        <SearchKeywords />
        <ImageGridLayout pagePath="/search" images={images} />
        {hasMore && <PulseAnimation />}
      </div>
      <ScrollToTopButton />
    </div>
  );
};
export default SearchPage;
