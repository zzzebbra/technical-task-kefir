import React from 'react'

type TProps = {
  fetchNextPage: () => unknown
  isDisabled: boolean
}

const LoadMoreButton = ({ fetchNextPage, isDisabled }: TProps): JSX.Element => {
  return (
    <button className='load-more' onClick={fetchNextPage} disabled={isDisabled} >Загрузить еще</button>
  )
}

export default LoadMoreButton
