import type { InfiniteData } from "@tanstack/react-query";
import type { TAuthor } from "src/types/authors";
import type { TComment, TCommentWithChildren, TData } from "src/types/comment";

const getCommentsWithAuthors = (
  comments: InfiniteData<TData | null, unknown> | undefined,
  authorMap: Map<number, TAuthor>,
): (TComment | null)[] | null => {
  if (!comments) {
    return null;
  }
  return comments.pages.flatMap((page) => {
    if (!page) {
      return null;
    }

    const checkParents = (currentComment: TComment, allComments: TComment[]): TCommentWithChildren | TComment => {
      const author = authorMap.get(currentComment.author);

      const childrenComment = allComments.find(({ parent }) => parent === currentComment.id);
      if (childrenComment) {
        return { ...currentComment, childrenComments: checkParents(childrenComment, allComments), authorName: author?.name, avatar: author?.avatar }
      }

      return { ...currentComment, authorName: author?.name, avatar: author?.avatar }
    }

    const prepareData = (initialData: TComment[]) => {
      const rootComments = initialData.filter(({ parent }) => !parent);
      return rootComments.map((rootComment) => checkParents(rootComment, page.data));
    }

    return prepareData(page.data)
  });
};

export default getCommentsWithAuthors;

