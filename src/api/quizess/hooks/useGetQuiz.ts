import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { GetQuiz } from '../api';

export const useGetQuiz = (id: string) => {
  const { data, ...args } = useQuery({
    queryKey: ['quiz', id],
    queryFn: () => GetQuiz(id),
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
