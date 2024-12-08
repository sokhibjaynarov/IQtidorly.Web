import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/dist/client/components/navigation';

import { paths } from 'src/routes/paths';

import { queryClient } from 'src/service/react-query';

import { toast } from 'src/components/snackbar';

import { CreateBooks } from '../api';

import type { InputBook } from '../type';

export const useCreateBook = () => {
  const router = useRouter();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: InputBook) => CreateBooks(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Yaratildi');
      router.push(paths.dashboard.books);
    },
    onError: (error: any) => toast.error(`Xatolik yuz berdi ${error.message}`),
  });
  return {
    bookCreate: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
