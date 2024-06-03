import getAuthorsRequest from "../api/authors/getAuthorsRequest";
import getCommentsRequest from "../api/comments/getCommentsRequest";
import type { TAuthor } from "../types/authors";
import type { TData } from "../types/comment";

export const errorCommentsWrapper = async (
  pageParam: number,
): Promise<TData | null> => {
  let res: TData | null = null;
  try {
    res = await getCommentsRequest(pageParam);
  } catch (err) {
    throw new Error("There was some error during loading, please, try again");
  }
  return res;
};

export const errorAuthorsWrapper = async (): Promise<TAuthor[] | null> => {
  let res: TAuthor[] | null = null;
  try {
    res = await getAuthorsRequest();
  } catch (err) {
    throw new Error("There was some error during loading, please, try again");
  }
  return res;
};
