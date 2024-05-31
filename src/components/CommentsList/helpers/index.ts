import type { InfiniteData } from '@tanstack/react-query';
import type { TAuthor } from 'src/types/authors';
import type { TComment, TData } from 'src/types/comment';

export const getCommentsWithAuthors = (comments: InfiniteData<TData | null, unknown> | undefined, authorMap: Map<number, TAuthor>, commentsByParent: Map<any, any>): Array<(TComment | null)> | null => {
  if (!comments) {
    return null
  } else {
    return comments.pages.flatMap((page) => {
      if (!page) {
        return null
      } else {
        return page?.data.map((comment: TComment) => {
          const author = authorMap.get(comment.author);
          comment.authorName = author?.name;
          comment.avatar = author?.avatar;
          comment.childrenComments = commentsByParent.get(comment.id) || [];
          return comment.parent === null ? comment : null;
        }).filter(Boolean)
      }
    })
  }
}
