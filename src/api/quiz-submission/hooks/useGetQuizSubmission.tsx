import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { GetQuizSubmission } from '../api';

export const useGetQuizSubmission = (id: string) => {
  const { data, ...args } = useQuery({
    queryKey: ['quiz-submission', id],
    queryFn: () => GetQuizSubmission(id),
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
