import type { InfiniteData } from "@tanstack/react-query";
import type { TAuthor } from "src/types/authors";
import type { TComment, TData } from "src/types/comment";

const getCommentsWithAuthors = (
  comments: InfiniteData<TData | null, unknown> | undefined,
  authorMap: Map<number, TAuthor>,
  commentsByParent: Map<number | null, TComment[]>,
): (TComment | null)[] | null => {
  if (!comments) {
    return null;
  }
  return comments.pages.flatMap((page) => {
    if (!page) {
      return null;
    }
    return page?.data
      .map((comment: TComment) => {
        const author = authorMap.get(comment.author);
        // WIP Переделать иммутабельно
        const updatedComment = { ...comment, authorName: author?.name, avatar: author?.avatar, childrenComments: commentsByParent.get(comment.id) || [] }
        return comment.parent === null ? updatedComment : null;
      })
      .filter(Boolean);
  });
};

export default getCommentsWithAuthors;
