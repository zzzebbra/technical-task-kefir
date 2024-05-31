import { useInfiniteQuery } from '@tanstack/react-query';
import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'

import { errorCommentsWrapper } from '../helpers/api'
import type { TData } from 'src/types/comment'

export const useCommentsQuery = (): UseInfiniteQueryResult<InfiniteData<TData | null, unknown>, Error> => {
  return useInfiniteQuery({
    queryFn: async ({ pageParam }) => await errorCommentsWrapper(pageParam),
    queryKey: ['comments'],
    initialPageParam: 1,
    retry: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalPages = lastPage?.pagination.total_pages;
      if (totalPages === lastPageParam) {
        return;
      }
      return lastPageParam + 1
    }
  })
}
