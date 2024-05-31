import React from 'react';
import type { TAuthor } from 'src/types/authors';
import type { TComment } from 'src/types/comment';
import CommentWithChildren from '../CommentWithChildren/CommentWithChildren';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import { getCommentsWithAuthors } from './helpers';
import { useAuthorsQuery } from 'src/hooks/useAuthorsQuery';
import { useCommentsQuery } from 'src/hooks/useCommentsQuery';

const CommentsList = (): JSX.Element => {
  const { data: comments, isLoading: isCommentsLoading, fetchNextPage, hasNextPage, isError, isFetchingNextPage, error } = useCommentsQuery();

  const { data: authors, isLoading: isAuthorsLoading } = useAuthorsQuery();

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
          commentsWithAuthors?.map((comment: TComment | null) => {
            return (
              <CommentWithChildren
                key={comment?.id}
                avatar={comment?.avatar}
                isLiked={false}
                likes={comment?.likes}
                text={comment?.text}
                authorName={comment?.authorName}
                created={comment?.created}
                id={comment?.id}
                childrenComments={comment?.childrenComments}
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
