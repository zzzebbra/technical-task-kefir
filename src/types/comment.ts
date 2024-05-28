export type TComment = {
  isLiked: boolean
  likes: number
  text: string
  id: number
  author: number
  authorName?: string
  avatar?: string
  created: string
  parent: number | null
}

export type TCommentWithChildren = TComment & {
  childrenComments: TComment[]
}
