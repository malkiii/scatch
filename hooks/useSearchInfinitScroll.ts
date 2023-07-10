import { useEffect } from 'react';
import { ImageAPIRequestQuery, ImagePage } from '@/types';
import { trpc } from '@/utils/trpc';
import { useScrollEvent } from './useScrollEvent';

type InfinitScrollHook = (params: {
  requestQuery: ImageAPIRequestQuery;
  initialData: ImagePage;
}) => ImagePage;

/* eslint-disable react-hooks/exhaustive-deps */
export const useSearchInfinitScroll: InfinitScrollHook = ({ initialData, requestQuery }) => {
  const { data, hasNextPage, fetchNextPage } = trpc.fetchImages.useInfiniteQuery(
    { params: requestQuery },
    {
      initialCursor: 1,
      initialData: {
        pageParams: [undefined],
        pages: [initialData]
      },
      getNextPageParam: ({ hasMore }, lastPage) => {
        if (!hasMore) return undefined;
        return lastPage.length + 1;
      }
    }
  );

  const images = data?.pages.flatMap(data => data.images) || [];

  const isCloseToEnd = useScrollEvent(() => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;
    const scrollPosition = window.scrollY;
    return scrollPosition >= fullHeight - windowHeight - 1000;
  });

  useEffect(() => {
    if (isCloseToEnd && hasNextPage) fetchNextPage();
  }, [isCloseToEnd]);

  return { images, hasMore: !!hasNextPage };
};
