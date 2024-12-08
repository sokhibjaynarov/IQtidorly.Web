import { useMutation } from '@tanstack/react-query';

import { queryClient } from 'src/service/react-query';

import { toast } from 'src/components/snackbar';

import { CreateQuizess } from '../api';

import type { Quizess } from '../type';

export const useCreateQuizess = (onClose: () => void) => {
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: Quizess) => CreateQuizess(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizess_list'] });
      toast.success('Olimpiada yaratildi');
      onClose();
    },
    onError: (error: any) => toast.error(`Xatolik yuz berdi:${error.message}`),
  });
  return {
    quizessCreate: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
