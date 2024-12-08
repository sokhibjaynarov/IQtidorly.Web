import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { GetMyBlance } from '../api';
import { getMyBlances } from '../adapter';

export const useGetMyBalance = () => {
  const initialData = {
    data: getMyBlances(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['my-balance'],
    queryFn: () => GetMyBlance(),
    select: (balances) => ({
      data: getMyBlances(get(balances, 'data.data')),
    }),
  });

  return {
    ...data,
    ...args,
  };
};
