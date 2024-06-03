import React, { type Dispatch, type SetStateAction } from 'react'
import type { TComment } from 'src/types/comment'
import BaseComment from '../BaseComment/BaseComment'

type TProps = {
  isLiked: boolean
  likes?: number
  text?: string
  id?: number
  authorName?: string
  avatar?: string
  created?: string
  childrenComments?: TComment[]
}

type TLikesProps = {
  likesQuantity: number
  setLikesQuantity: Dispatch<SetStateAction<number>>
}

const CommentWithChildren = ({ isLiked, likes, text, avatar, authorName, created, id, childrenComments, setLikesQuantity, likesQuantity }: TProps & TLikesProps): JSX.Element => {
  const isChildrenExist = !!childrenComments && childrenComments?.length > 0;
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
        setAllLikesQuantity={setLikesQuantity}
        allLikesQuantity={likesQuantity}
      />
      { isChildrenExist && <div className="children-comments">
        {
          childrenComments?.map((comment: TProps) => {
            return <CommentWithChildren
              key={comment.id}
              avatar={comment.avatar}
              isLiked={isLiked}
              likes={comment.likes}
              text={comment.text}
              authorName={comment.authorName}
              created={comment.created}
              id={comment.id}
              childrenComments={comment.childrenComments}
              likesQuantity={likesQuantity}
              setLikesQuantity={setLikesQuantity}
            />
          })
        }
      </div>
      }
    </>
  )
}

export default CommentWithChildren
