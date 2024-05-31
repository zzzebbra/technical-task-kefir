import React from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import type { TAuthor } from 'src/types/authors';
import type { TComment, TCommentWithChildren } from 'src/types/comment';
import CommentWithChildren from '../CommentWithChildren/CommentWithChildren';
import getAuthorsRequest from 'src/api/authors/getAuthorsRequest';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import { errorWrapper } from 'src/helpers/api';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import { getCommentsWithAuthors } from './helpers';

const CommentsList = (): JSX.Element => {
  const { data: comments, isLoading: isCommentsLoading, fetchNextPage, hasNextPage, isError, isFetchingNextPage, error } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => await errorWrapper(pageParam),
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

  const { data: authors, isLoading: isAuthorsLoading } = useQuery<TAuthor[]>({
    queryFn: async () => await getAuthorsRequest(),
    queryKey: ['authors']
  })

  const authorMap = new Map<number, TAuthor>(authors?.map(author => [author.id, author]));

  const commentsByParent = new Map();

  comments?.pages.forEach((page) => {
    page?.data.forEach((comment: TComment) => {
      const parentId = comment.parent;
      if (!commentsByParent.has(parentId)) {
        commentsByParent.set(parentId, []);
      }
      commentsByParent.get(parentId).push(comment);
    })
  });

  const commentsWithAuthors = getCommentsWithAuthors(comments, authorMap, commentsByParent)

  return (
    <>
      <div className='comments-list'>
        {isCommentsLoading && isAuthorsLoading && <Loader />}
        {
          commentsWithAuthors?.map((comment: TComment) => {
            return (
              <CommentWithChildren
                key={comment.id}
                avatar={comment.avatar}
                isLiked={false}
                likes={comment.likes}
                text={comment.text}
                authorName={comment.authorName}
                created={comment.created}
                id={comment.id}
                childrenComments={comment.childrenComments}
              />
            )
          })
        }
      </div>
      {isFetchingNextPage && <Loader />}
      {isError && !isFetchingNextPage && <Error errorText={error.message} />}
      {hasNextPage && <LoadMoreButton isDisabled={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
    </>
  )
}

export default CommentsList
