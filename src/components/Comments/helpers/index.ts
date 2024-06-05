import pluralize from "pluralize-ru";

const pluralizeComments = (commentsCounter: number): string =>
  pluralize(
    commentsCounter,
    "нет комментариев",
    "%d комментарий",
    "%d комментария",
    "%d комментариев",
  );

  export default pluralizeComments;
