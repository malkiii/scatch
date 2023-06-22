import { useEffect } from 'react';
import { ImageAPIRequestQuery, ImagePage } from '@/types';
import { trpc } from '@/utils/trpc';
import { useScrollingEvent } from './useScrollingEvent';

type FetchConfigs = {
  requestQuery: ImageAPIRequestQuery;
  initialData: ImagePage;
};

type InfinitScrollHook = (configs: FetchConfigs) => ImagePage;

/* eslint-disable react-hooks/exhaustive-deps */
export const useInfinitScroll: InfinitScrollHook = configs => {
  const initialData = {
    pageParams: [undefined],
    pages: [configs.initialData]
  };

  const { data, hasNextPage, fetchNextPage } = trpc.fetchImages.useInfiniteQuery(
    { params: configs.requestQuery },
    {
      initialCursor: 1,
      initialData: initialData,
      getNextPageParam: ({ hasMore }, lastPage) => {
        if (!hasMore) return undefined;
        return lastPage.length + 1;
      }
    }
  );

  const images = data?.pages.flatMap(data => data.images) || [];

  const isCloseToEnd = useScrollingEvent(() => {
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
