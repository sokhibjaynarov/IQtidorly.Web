import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from 'src/service/react-query';

import { DeleteBook } from '../api';

export const useDeleteBook = () => {
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (id?: string) => DeleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Successfully deleted!');
    },
    onError: (error: any) => console.log(error),
  });
  return {
    bookDelete: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
