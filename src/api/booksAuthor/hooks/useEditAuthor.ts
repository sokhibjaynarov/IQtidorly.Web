import { useMutation } from '@tanstack/react-query';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { queryClient } from 'src/service/react-query';

import { toast } from 'src/components/snackbar';

import { EditAuthors } from '../api';

import type { BooksAuthor } from '../type';


export const useEditAuthor = (id?: string) => {
    const router = useRouter();
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: (values: BooksAuthor) => EditAuthors(values, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['book-authors', ['authors', id]] });
            toast.success('Tahrirlandi');
            router.push(paths.dashboard.author);
        },
        onError: (error: any) => toast.error(`Xatolik yuz berdi ${error.message}`),
    });
    return {
        authorEdit: mutate,
        isPending,
        isSuccess,
        isError,
    };
};