import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/dist/client/components/navigation';

import { paths } from 'src/routes/paths';

import { queryClient } from 'src/service/react-query';

import { toast } from 'src/components/snackbar';

import { CreateQuetions } from '../api';

import type { QuestionCard } from '../type';

export const useCreateQuestion = () => {
  const router = useRouter();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: QuestionCard) => CreateQuetions(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['question_list'] });
      toast.success('Yaratildi');
      router.push(paths.dashboard.two);
    },
    onError: (error: any) => toast.error(`Xatolik yuz berdi ${error.message}`),
  });
  return {
    questionCreate: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
