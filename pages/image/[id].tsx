import Head from 'next/head';
import { ResponseImage } from '@/utils/types';
import { fetchPhoto } from '@/utils/fetchImages';
import { GetServerSideProps, NextPage } from 'next';
import ImagePageContent from '@/components/Search/ImagePageContent';

export const getServerSideProps: GetServerSideProps = async context => {
  const { query, res } = context;
  const id = query.id as string;

  res.setHeader('Cache-Control', 's-maxage=1200, stale-while-revalidate=600');
  const { image, alt } = await fetchPhoto(id);

  return {
    props: { image, alt, key: id }
  };
};

type PageProps = {
  image: ResponseImage;
  alt: string;
};

const imagePage: NextPage<PageProps> = props => {
  const title = `Scatch | ${props.alt || props.image.photographer}`;
  return (
    <div className="main-container bg-cs-change p-5 my-6 rounded-xl shadow-2xl">
      <Head>
        <title>{title}</title>
      </Head>
      <ImagePageContent {...props} />
    </div>
  );
};
export default imagePage;
