import { useMutation } from '@tanstack/react-query';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { queryClient } from 'src/service/react-query';

import { toast } from 'src/components/snackbar';

import { EditBooks } from '../api';

import type { InputBook } from '../type';

export const useEditBook = (id?: string) => {
  const router = useRouter();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: InputBook) => EditBooks(values, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books', ['book', id]] });
      toast.success('Tahrirlandi');
      router.push(paths.dashboard.books);
    },
    onError: (error: any) => toast.error(`Xatolik yuz berdi ${error.message}`),
  });
  return {
    bookEdit: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
