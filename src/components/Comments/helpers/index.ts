import pluralize from 'pluralize-ru'

export const pluralizeComments = (commentsCounter: number): string => pluralize(commentsCounter, 'нет комментариев', '%d комментарий', '%d комментария', '%d комментариев')
