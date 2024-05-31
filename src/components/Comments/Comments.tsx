import React, { useEffect, useState } from 'react'
import likesLightBorder from '../../assets/icons/heart-icon-border-light.svg'
import CommentsList from '../CommentsList/CommentsList'
import { useCommentsQuery } from 'src/helpers/hooks';

const Comments = (): JSX.Element => {
  const [likesQuantity, setLikesQuantity] = useState(0);
  const [commentsQuantity, setCommentsQuantity] = useState(0);

  const { data: comments } = useCommentsQuery();
  const allLikesQuantity = comments?.pages.flatMap(page => page?.data.map(comment => comment.likes)).reduce((acc, likes) => acc! + likes!, 0) ?? 0;
  const allCommentsQuantity = comments?.pages.reduce((acc, page) => acc + page!.data.length, 0) ?? 0;

  useEffect(() => {
    if (allLikesQuantity) { setLikesQuantity(allLikesQuantity) }
    if (allCommentsQuantity) { setCommentsQuantity(allCommentsQuantity) }
  }, [allLikesQuantity, allCommentsQuantity])

  return (
    <>
      <section className='comments'>
        <div className="comment__heading">
          <span className="comments__title">{commentsQuantity} комментариев</span>
          <div className="comments__likes">
            <img src={likesLightBorder} alt="Heart shape icon with light border" />
            <span className="comments__likes-quantity">{likesQuantity}</span>
          </div>
        </div>
        <CommentsList/>
      </section>
    </>
  )
}

export default Comments
