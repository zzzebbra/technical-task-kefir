import { useQuery } from '@tanstack/react-query';
import { errorAuthorsWrapper } from '../helpers/api'

const useAuthorsQuery = () => useQuery({
    queryFn: async () => errorAuthorsWrapper(),
    queryKey: ['authors']
  })

export default useAuthorsQuery;
