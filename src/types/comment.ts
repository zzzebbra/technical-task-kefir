export type TComment = {
  isLiked: boolean;
  likes: number;
  text: string;
  id: number;
  author: number;
  authorName?: string;
  avatar?: string;
  created: string;
  parent: number | null;
  childrenComments?: TComment[];
};

export type TCommentWithChildren = TComment & {
  childrenComments: TComment[];
};

export type TData = {
  data: TComment[];
  pagination: {
    page: number;
    size: number;
    total_pages: number;
  };
};
