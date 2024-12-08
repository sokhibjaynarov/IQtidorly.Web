import { useMutation } from '@tanstack/react-query';

import { queryClient } from 'src/service/react-query';

import { DeleteAuthor } from '../api';


export const useDeleteAuthor = () => {
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: (id?: string) => DeleteAuthor(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['book-authors'] });
        },
        onError: (error: any) => console.log(error),
    });
    return {
        authorDelete: mutate,
        isPending,
        isSuccess,
        isError,
    };
};
