import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { GetEditAuthor } from '../api';

export const useGetEditAuthors = (id?: string) => {
    const { data, ...args } = useQuery({
        queryKey: ['authors', id],
        queryFn: () => GetEditAuthor(id),
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
