import React, { type Dispatch, type SetStateAction, useState } from 'react'
import likesRedBorder from '../../assets/icons/heart-icon-border-red.png'
import likesFilledRed from '../../assets/icons/heart-icon-filled-red.png'
import { formateDateToFriendlyFormat } from 'src/helpers/date'

type TProps = {
  isLiked: boolean
  likes?: number
  text?: string
  id?: number
  authorName?: string
  avatar?: string
  created?: string
  allLikesQuantity: number
  setAllLikesQuantity: Dispatch<SetStateAction<number>>
}

const BaseComment = ({ isLiked, likes, text, avatar, authorName, created, id, allLikesQuantity, setAllLikesQuantity }: TProps): JSX.Element => {
  const [isCommentLiked, setIsCommentLiked] = useState(isLiked);
  const [likesQuantity, setLikesQuantity] = useState(likes);
  const createdText = formateDateToFriendlyFormat(created!);

  const toggleLike = (): void => {
    setIsCommentLiked(!isCommentLiked);
    if (!isCommentLiked) {
      likesQuantity !== undefined && setLikesQuantity(likesQuantity + 1);
      setAllLikesQuantity(allLikesQuantity + 1);
    } else {
      likesQuantity !== undefined && setLikesQuantity(likesQuantity - 1);
      setAllLikesQuantity(allLikesQuantity - 1);
    }
  }

  return (
    <div className='comment'>
      <div className="comment__info">
        <div className="comment__avatar-wrapper">
          <img className='comment__avatar' src={avatar} alt="author picture" />
          <div className="comment__name-date-wrapper">
            <span className="comment__author-name">{authorName}</span>
            <span className="comment__date">{createdText}</span>
          </div>
        </div>
        <div className="comments__likes">
          <button className='comments__like-button' type='button' onClick={toggleLike}>
            <img src={isCommentLiked ? likesFilledRed : likesRedBorder} alt="Heart shape icon with light border" /></button>
          <span className="comments__likes-quantity">{likesQuantity}</span>
        </div>
      </div>
      <p className="comment__text">{text}</p>
    </div>
  )
}

export default BaseComment
