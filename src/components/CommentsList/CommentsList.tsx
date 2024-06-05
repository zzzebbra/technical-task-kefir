import React, { type Dispatch, type SetStateAction } from 'react';
import type { TAuthor } from 'src/types/authors';
import type { TComment } from 'src/types/comment';
import useAuthorsQuery from '../../hooks/useAuthorsQuery';
import useCommentsQuery from '../../hooks/useCommentsQuery';
import CommentWithChildren from '../CommentWithChildren/CommentWithChildren';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import getCommentsWithAuthors from './helpers';

type TProps = {
  likesQuantity: number
  setLikesQuantity: Dispatch<SetStateAction<number>>
}

const CommentsList = ({ likesQuantity, setLikesQuantity }: TProps): JSX.Element => {
  const { data: comments, isLoading: isCommentsLoading, fetchNextPage, hasNextPage, isError: isCommentsError, isFetchingNextPage, error: commentsError } = useCommentsQuery();
  const { data: authors, isLoading: isAuthorsLoading } = useAuthorsQuery();
  const authorMap = new Map<number, TAuthor>(authors?.map((author: TAuthor) => [author.id, author]));

  const commentsWithAuthors = getCommentsWithAuthors(comments, authorMap);
  const isDataFetching = isCommentsLoading && isAuthorsLoading;

  return (
    <>
      <div className='comments-list'>
        {isDataFetching && <Loader />}
        {
          commentsWithAuthors?.map((comment) => {
            if (!comment) {
              return null
            }
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
                likesQuantity={likesQuantity}
                setLikesQuantity={setLikesQuantity}
              />
            )
          })
        }
      </div>
      {isFetchingNextPage && <Loader />}
      {/* дополняем условие, т.к. ошибка не сбрасывается сразу же после отправки нового запроса */}
      {isCommentsError && !isFetchingNextPage && <Error errorText={commentsError.message} />}
      {hasNextPage && <LoadMoreButton isDisabled={isFetchingNextPage} fetchNextPage={fetchNextPage} />}
    </>
  )
}

export default CommentsList
