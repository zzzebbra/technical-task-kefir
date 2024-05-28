import React from 'react'
import type { TComment } from 'src/types/comment'
import BaseComment from '../BaseComment/BaseComment'

type TProps = {
  isLiked: boolean
  likes: number
  text: string
  id: number
  authorName?: string
  avatar?: string
  created: string
  childrenComments?: TComment[]
}

const CommentWithChildren = ({ isLiked, likes, text, avatar, authorName, created, id, childrenComments }: TProps): JSX.Element => {
  const isChildrenExist = !!childrenComments && childrenComments?.length > 0
  return (
    <>
      <BaseComment
        key={id}
        avatar={avatar}
        isLiked={false}
        likes={likes}
        text={text}
        authorName={authorName}
        created={created}
        id={id}
      />
      { isChildrenExist && <div className="children-comments">
        {
          childrenComments?.map((comment: TProps) => {
            return <CommentWithChildren
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
          })
        }
      </div>
      }
    </>
  )
}

export default CommentWithChildren
