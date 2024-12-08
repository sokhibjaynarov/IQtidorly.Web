import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { GetEditQuestion } from '../api';

export const useGetEditQuestions = (id?: string) => {
  const { data, ...args } = useQuery({
    queryKey: ['question', id],
    queryFn: () => GetEditQuestion(id),
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
