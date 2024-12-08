import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { GetChapterList } from '../api';

export const useGetChapterList = (subjectCode: string) => {
  const { data, ...args } = useQuery({
    queryKey: ['chapter_list', subjectCode],
    queryFn: () => GetChapterList(subjectCode),
    // eslint-disable-next-line @typescript-eslint/no-shadow
    select: (data) => ({
      data: get(data, 'data.data'),
    }),
    enabled: !!subjectCode,
  });

  return {
    ...data,
    ...args,
  };
};
