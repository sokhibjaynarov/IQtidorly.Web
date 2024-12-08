import { useMutation } from '@tanstack/react-query';

import { queryClient } from 'src/service/react-query';

import { DeleteQuestion } from '../api';

export const useDeleteQuestion = () => {
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (id?: string) => DeleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['question_list'] });
    },
    onError: (error: any) => console.log(error),
  });
  return {
    questionDelete: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
