import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import type { TAuthor } from 'src/types/authors'
import type { TComment, TCommentWithChildren } from 'src/types/comment'
import CommentWithChildren from '../CommentWithChildren/CommentWithChildren'

const CommentsList = (): JSX.Element => {
  const [page, setPage] = useState(1)

  const getComments = axios.get('api/comments', { params: { page } }).then(function (response) {
    return (response.data)
  })

  const { data: comments, isLoading: isCommentsLoading } = useQuery({
    queryFn: async () => await getComments,
    queryKey: ['comments']
  })

  const getAuthors: Promise<TAuthor[]> = axios.get('api/authors').then(function (response) {
    return (response.data)
  })

  const { data: authors, isLoading: isAuthorsLoading } = useQuery({
    queryFn: async () => await getAuthors,
    queryKey: ['authors']
  })

  const authorMap = new Map(authors?.map(author => [author.id, author]));

  const commentsByParent = new Map();

  comments?.data.forEach((comment: TComment) => {
    const parentId = comment.parent;
    if (!commentsByParent.has(parentId)) {
      commentsByParent.set(parentId, []);
    }
    commentsByParent.get(parentId).push(comment);
  });

  const commentsWithAuthors = comments?.data.map((comment: TCommentWithChildren) => {
    const author = authorMap.get(comment.author);
    comment.authorName = author?.name;
    comment.avatar = author?.avatar;
    comment.childrenComments = commentsByParent.get(comment.id) || [];
    return comment.parent === null ? comment : null;
  }).filter(Boolean);

  return (
    <div className='comments-list'>
      {
        commentsWithAuthors?.map((comment: TCommentWithChildren) => {
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
  )
}

export default CommentsList
