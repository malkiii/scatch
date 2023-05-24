import Head from 'next/head';
import { ResponseImage } from '@/types';
import { fetchPhoto } from '@/utils/fetchImages';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import ImagePageContent from '@/components/Search/ImagePageContent';

type PageProps = {
  image: ResponseImage;
  alt: string;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  const id = context.query.id as string;
  context.res.setHeader('Cache-Control', 's-maxage=1200, stale-while-revalidate=600');

  const { image, alt } = await fetchPhoto(id);

  if (!image) return { notFound: true };

  return {
    props: { image, alt, key: id }
  };
};

const imagePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = props => {
  const title = `Scatch | ${props.alt || props.image.photographer}`;
  return (
    <div className="pt-24">
      <div className="main-container bg-cs-change mb-6 rounded-xl p-5 shadow-2xl">
        <Head>
          <title>{title}</title>
        </Head>
        <ImagePageContent {...props} />
      </div>
    </div>
  );
};
export default imagePage;
