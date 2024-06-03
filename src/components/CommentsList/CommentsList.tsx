import React, { type Dispatch, type SetStateAction } from 'react';
import type { TAuthor } from 'src/types/authors';
import type { TComment } from 'src/types/comment';
import useAuthorsQuery  from '../../hooks/useAuthorsQuery';
import useCommentsQuery from '../../hooks/useCommentsQuery';
import CommentWithChildren from '../CommentWithChildren/CommentWithChildren';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import getCommentsWithAuthors  from './helpers';

type TProps = {
  likesQuantity: number
  setLikesQuantity: Dispatch<SetStateAction<number>>
}

const CommentsList = ({ likesQuantity, setLikesQuantity }: TProps): JSX.Element => {
  const { data: comments, isLoading: isCommentsLoading, fetchNextPage, hasNextPage, isError, isFetchingNextPage, error } = useCommentsQuery();
  const { data: authors, isLoading: isAuthorsLoading } = useAuthorsQuery();
  const authorMap = new Map<number, TAuthor>(authors?.map((author: TAuthor) => [author.id, author]));
  const commentsByParent = new Map<number | null, TComment[]>();

  comments?.pages.forEach((page) => {
    page?.data.forEach((comment: TComment) => {
      const parentId = comment.parent;
      if (!commentsByParent.has(parentId)) {
        commentsByParent.set(parentId, []);
      }
      commentsByParent.get(parentId)?.push(comment);
    })
  });

  const commentsWithAuthors = getCommentsWithAuthors(comments, authorMap, commentsByParent);
  const isDataFetching = isCommentsLoading && isAuthorsLoading;

  return (
    <>
      <div className='comments-list'>
        {isDataFetching && <Loader />}
        {
          commentsWithAuthors?.map((comment) => {
            if(!comment){
               return null
            }
            return(
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
                likesQuantity={likesQuantity}
                setLikesQuantity={setLikesQuantity}
              />
            )})
        }
      </div>
      {isFetchingNextPage && <Loader />}
      {/* дополняем условие, т.к. ошибка не сбрасывается сразу же после отправки нового запроса */}
      {isError && !isFetchingNextPage && <Error errorText={error.message} />}
      {hasNextPage && <LoadMoreButton isDisabled={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
    </>
  )
}

export default CommentsList
