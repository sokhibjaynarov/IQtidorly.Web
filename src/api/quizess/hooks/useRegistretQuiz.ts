import { useMutation } from '@tanstack/react-query';

import { queryClient } from 'src/service/react-query';

import { toast } from 'src/components/snackbar';

import { RegisterForQuiz } from '../api';

export const useRegisterForQuiz = () => {
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (id: string) => RegisterForQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz'] });
      toast.success("Olimpiadaga muvofaqatli registratsiyadan o'tingiz");
    },

    onError: (error: any) => toast.error(`Xatolik yuz berdi${error}`),
  });
  return {
    quizesReg: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
