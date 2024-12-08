import { useMutation } from '@tanstack/react-query';

import { queryClient } from 'src/service/react-query';

import { DeleteQuizess } from '../api';

export const useDeleteQuizess = () => {
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (id?: string) => DeleteQuizess(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizess_list'] });
    },
    onError: (error: any) => console.log(error),
  });
  return {
    quizessDelete: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
