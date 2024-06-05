import { useInfiniteQuery } from "@tanstack/react-query";
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import { errorCommentsWrapper } from "../helpers/api";
import type { TData } from "../types/comment";

const useCommentsQuery = (): UseInfiniteQueryResult<
  InfiniteData<TData | null, unknown>,
  Error
> => useInfiniteQuery({
    queryFn: async ({ pageParam }) => errorCommentsWrapper(pageParam),
    queryKey: ["comments"],
    initialPageParam: 1,
    retry: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalPages = lastPage?.pagination.total_pages;
      if (totalPages === lastPageParam) {
        return;
      }
      // eslint-disable-next-line consistent-return
      return lastPageParam + 1;
    },
  });

  export default useCommentsQuery;
