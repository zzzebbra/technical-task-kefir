import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import type { DefinedInitialDataOptions, InfiniteData, QueryKey, UseInfiniteQueryResult } from '@tanstack/react-query'
import { type TAuthor } from 'src/types/authors'
import { errorAuthorsWrapper, errorCommentsWrapper } from './api'
import type { TData } from 'src/types/comment'

export const useAuthorsQuery = () => {
  return useQuery<TAuthor[]>({
    queryFn: async () => await errorAuthorsWrapper(),
    queryKey: ['authors']
  })
}

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
