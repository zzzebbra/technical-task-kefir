import getCommentsRequest from 'src/api/comments/getCommentsRequest';
import type { TData } from 'src/types/comment';

export const errorWrapper = async (pageParam: number): Promise<TData | null> => {
  let res: TData | null = null;
  try {
    res = await getCommentsRequest(pageParam);
  } catch (err) {
    throw new Error('There was some error during loading, please, try again');
  }
  return res
}
