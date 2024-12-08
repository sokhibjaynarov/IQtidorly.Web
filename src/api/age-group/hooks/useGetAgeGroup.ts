import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { GetAgeGroup } from '../api';

export const useGetAgeGroup = () => {
  const { data, ...args } = useQuery({
    queryKey: ['age_list'],
    queryFn: () => GetAgeGroup(),
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
