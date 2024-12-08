import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { GetEditBook } from '../api';

export const useGetEditBooks = (id?: string) => {
    const { data, ...args } = useQuery({
        queryKey: ['book', id],
        queryFn: () => GetEditBook(id),
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
