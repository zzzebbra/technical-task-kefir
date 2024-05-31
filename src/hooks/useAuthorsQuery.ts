import { useQuery } from '@tanstack/react-query';
import { type TAuthor } from 'src/types/authors'
import { errorAuthorsWrapper } from '../helpers/api'

export const useAuthorsQuery = () => {
  return useQuery<TAuthor[]>({
    queryFn: async () => await errorAuthorsWrapper(),
    queryKey: ['authors']
  })
}
