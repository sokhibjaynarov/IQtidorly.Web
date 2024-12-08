import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { GetSubjectsList } from '../api';

import type { Subject } from '../type';

const getSocialNetwork = (item?: Subject) => ({
  _id: item?._id ?? '',
  name: item?.name ?? '',
});
const getSubjects = (data?: Subject[]) =>
  data?.length ? data.map((item) => getSocialNetwork(item)) : [];

export const useGetSubjects = () => {
  const initailValue = { data: getSubjects() };

  const { data = initailValue, ...args } = useQuery({
    queryKey: ['subject_list'],
    queryFn: () => GetSubjectsList(),
    select: (subjects) => ({
      data: getSubjects(get(subjects, 'data.data')),
    }),
  });
  return {
    ...data,
    ...args,
  };
};
