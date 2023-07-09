import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { db } from '@/server/db/client';
import { getCurrentSession } from '@/utils/session';
import { useUserImages } from '@/hooks/dashboard';
import { NoImages } from '@/components/Dashboard/UserImagesPage';
import ImageGridLayout from '@/components/ImageGridLayout';
import { PulseAnimation } from '@/components/Loading';

type PageProps = {
  url: string;
  userId: string;
  albumName: string;
};
export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  const session = await getCurrentSession(context);
  if (!session) return { redirect: { destination: '/login', permanent: false } };

  const userId = session.user.id;
  const name = context.query.name as string;
  const albumName = name.replace('-', ' ');

  const album = await db.album.findUnique({
    select: { name: true },
    where: { name_userId: { userId, name: albumName } }
  });

  if (!album) return { notFound: true };
  return { props: { userId, albumName, url: `/albums/${name}` } };
};

const albumPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = props => {
  const { userId, albumName, url } = props;
  const { images, hasImages, hasMoreImages } = useUserImages(userId, albumName);

  return (
    <div className="main-container mb-7 pt-28">
      <div className="mb-6 capitalize px-4">
        <h2 className="py-4 border-b">{albumName} collection.</h2>
      </div>
      {hasImages && <ImageGridLayout images={images} pagePath={url} />}
      {!hasImages && <NoImages />}
      {hasMoreImages && <PulseAnimation />}
    </div>
  );
};

export default albumPage;
