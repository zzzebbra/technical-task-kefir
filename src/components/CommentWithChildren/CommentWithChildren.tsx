import React, { type Dispatch, type SetStateAction } from 'react';
import type { TComment } from 'src/types/comment';
import BaseComment from '../BaseComment/BaseComment';

type TProps = {
  isLiked: boolean;
  likes: number;
  text: string;
  id: number;
  authorName?: string;
  avatar?: string;
  created: string;
  childrenComments?: TComment;
}

type TLikesProps = {
  likesQuantity: number;
  setLikesQuantity: Dispatch<SetStateAction<number>>;
}

const CommentWithChildren = ({
  isLiked,
  likes,
  text,
  avatar,
  authorName,
  created,
  id,
  childrenComments,
  setLikesQuantity,
  likesQuantity,
}: TProps & TLikesProps): JSX.Element => (
  <>
    <BaseComment
      key={id}
      avatar={avatar}
      isLiked={false}
      likes={likes}
      text={text}
      authorName={authorName}
      created={created}
      setAllLikesQuantity={setLikesQuantity}
      allLikesQuantity={likesQuantity}
    />
    {childrenComments &&
      <div className="children-comments">
        <CommentWithChildren
          key={childrenComments.id}
          avatar={childrenComments.avatar}
          isLiked={isLiked}
          likes={childrenComments.likes}
          text={childrenComments.text}
          authorName={childrenComments.authorName}
          created={childrenComments.created}
          id={childrenComments.id}
          childrenComments={childrenComments.childrenComments}
          likesQuantity={likesQuantity}
          setLikesQuantity={setLikesQuantity}
        />
      </div>
    }
  </>
)

export default CommentWithChildren
