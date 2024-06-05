import React from "react";
import useScreenSize from "../../hooks/useScreenSize";
import errorNormal from "../../assets/icons/error-size-normal.svg";
import errorBig from "../../assets/icons/error-size-big.svg";

type TError = {
  errorText: string;
};

const Error = ({ errorText }: TError): JSX.Element => {
  const screenSize = useScreenSize();

  return (
    <div className="error">
      <img src={ screenSize.width > 425 ? errorBig : errorNormal} alt="Red Exclamation point" />
      <span className="error__text">{errorText}</span>
    </div>
  )
}


export default Error;
