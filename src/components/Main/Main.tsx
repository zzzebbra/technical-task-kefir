import React from 'react'
import Comments from '../Comments/Comments'
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton'

const Main = (): JSX.Element => {
  return (
    <div className='main'>
      <Comments />
      <LoadMoreButton />
    </div>
  )
}

export default Main
