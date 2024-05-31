import React from 'react'
import errorBig from '../../assets/icons/error-size-big.svg'

type TError = {
  errorText: string
}

const Error = ({ errorText }: TError): JSX.Element => {
  return (
    <div className='error'>
      <img src={errorBig} alt="Red Exclamation point" />
      <span className='error__text'>{errorText}</span>
    </div>
  )
}

export default Error
