import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { GetRegUsers } from '../api';

export const useGetRegUsers = (page: number, limit: number) => {
  const initialData = {
    data: [],
    pagination: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['reg_users_list', page, limit],
    queryFn: () => GetRegUsers(page, limit),
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
