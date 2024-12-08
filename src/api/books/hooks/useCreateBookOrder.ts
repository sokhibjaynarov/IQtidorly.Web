import { useMutation } from '@tanstack/react-query';

import { toast } from 'src/components/snackbar';

import { CreateBookOrders } from '../api';

import type { CreateBookOrder } from '../type';

export const useCreateBookOrder = () => {
  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: CreateBookOrder) => CreateBookOrders(values),
    onError: (error: any) => toast.error(`Xatolik yuz berdi: ${error.message}`),
  });
  return {
    createBookOrder: mutateAsync,
    isPending,
    isSuccess,
    isError,
  };
};
