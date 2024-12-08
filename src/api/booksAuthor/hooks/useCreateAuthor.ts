import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/dist/client/components/navigation';

import { paths } from 'src/routes/paths';

import { queryClient } from 'src/service/react-query';

import { toast } from 'src/components/snackbar';

import { CreateAuthors } from '../api';

import type { BooksAuthor } from '../type';

export const useCreateAuthor = () => {
    const router = useRouter();
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: (values: BooksAuthor) => CreateAuthors(values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['book-authors'] });
            toast.success('Yaratildi');
            router.push(paths.dashboard.author);
        },
        onError: (error: any) => toast.error(`Xatolik yuz berdi ${error.message}`),
    });
    return {
        authorCreate: mutate,
        isPending,
        isSuccess,
        isError,
    };
};
