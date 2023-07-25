import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { caller } from '@/server/router';
import { ResponseImage } from '@/types';
import ImagePageContent from '@/components/Search/ImagePageContent';

type PageProps = {
  image: ResponseImage;
  alt: string;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  const id = context.query.id as string;
  context.res.setHeader('Cache-Control', 's-maxage=1200, stale-while-revalidate=600');

  try {
    const { image, alt } = await caller.fetchPhoto(Number.parseInt(id));
    return { props: { image, alt, key: id } };
  } catch (error) {
    return { notFound: true };
  }
};

const imagePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = props => {
  const title = `Scatch | ${props.alt || props.image.photographer}`;
  return (
    <div className="pt-24">
      <div className="main-container mb-6 rounded-xl bg-neutral p-5 shadow-2xl">
        <Head>
          <title>{title}</title>
        </Head>
        <ImagePageContent {...props} />
      </div>
    </div>
  );
};

export default imagePage;
