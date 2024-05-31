import React from 'react'
import likesLightBorder from '../../assets/icons/heart-icon-border-light.svg'
import CommentsList from '../CommentsList/CommentsList'

const Comments = (): JSX.Element => {
  const likesQuantity = 0;
  const commentsQuantity = 0;

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
