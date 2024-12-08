import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { GetQuizQuestion } from '../api';

export const useGetQuizQuestion = (id: string) => {
  const { data, ...args } = useQuery({
    queryKey: ['quiz', id],
    queryFn: () => GetQuizQuestion(id),
    // eslint-disable-next-line @typescript-eslint/no-shadow
    select: (data) => ({
      data: get(data, 'data.data'),
    }),
  });
  return {
    ...data,
    ...args,
  };
};
