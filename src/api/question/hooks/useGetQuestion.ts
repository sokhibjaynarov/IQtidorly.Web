import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { GetQuestions } from '../api';

export const useGetQuestions = (page: number, limit: number) => {
  const initialData = {
    data: [],
    pagination: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['question_list', page, limit],
    queryFn: () => GetQuestions(page, limit),
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
