import React from "react";

type TProps = {
  fetchNextPage: () => unknown;
  isDisabled: boolean;
};

const LoadMoreButton = ({ fetchNextPage, isDisabled }: TProps): JSX.Element => (
    <button
      className="load-more"
      type="button"
      onClick={fetchNextPage}
      disabled={isDisabled}
    >
      Загрузить еще
    </button>
  );

export default LoadMoreButton;
