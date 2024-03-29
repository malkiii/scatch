import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { trpc } from '@/utils/trpc';
import { useScrollEvent } from '../useScrollEvent';

/* eslint-disable react-hooks/exhaustive-deps */
const useInfinitScroll = (hasNextPage: boolean, fetchNextPage: Function) => {
  const isCloseToEnd = useScrollEvent(() => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;
    const scrollPosition = window.scrollY;
    return scrollPosition >= fullHeight - windowHeight - 1000;
  });

  useEffect(() => {
    if (isCloseToEnd && hasNextPage) fetchNextPage();
  }, [isCloseToEnd]);
};

export const useUserImages = (userId: string, albumName?: string, isFavorite?: boolean) => {
  const router = useRouter();
  const imageRoute = albumName
    ? trpc.getAlbumImages
    : isFavorite
    ? trpc.getAllFavoriteImages
    : trpc.getAllImages;

  const input = { userId, name: albumName! };
  const { data, isLoading, hasNextPage, refetch, fetchNextPage } = imageRoute.useInfiniteQuery(
    input,
    {
      initialCursor: 1,
      getNextPageParam: ({ hasMore }, lastPage) => {
        if (!hasMore) return undefined;
        return lastPage.length + 1;
      }
    }
  );

  const images = data?.pages.flatMap(({ data }) => data) || [];
  const hasMoreImages = !!hasNextPage;

  useEffect(() => {
    if (router.asPath.startsWith('/dashboard') && !isLoading) refetch();
  }, [router.asPath]);

  useInfinitScroll(hasMoreImages, fetchNextPage);

  return { images, hasMoreImages, hasImages: isLoading || !!images.length };
};
