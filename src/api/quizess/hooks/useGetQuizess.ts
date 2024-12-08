import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { GetQuizessList } from '../api';

export const useGetQuizess = (page: number, limit: number, type?: string) => {
  const initialData = {
    data: [],
    pagination: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['quizess_list', page, limit, type],
    queryFn: () => GetQuizessList(page, limit, type),
    // eslint-disable-next-line @typescript-eslint/no-shadow
    select: (data) => ({
      data: get(data, 'data.data'),
      pagination: get(data, 'data.pagination'),
    }),
  });
  return {
    ...data,
    ...args,
  };
};
