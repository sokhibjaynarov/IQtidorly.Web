import { useMutation } from '@tanstack/react-query';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { queryClient } from 'src/service/react-query';

import { toast } from 'src/components/snackbar';

import { EditQuestions } from '../api';

import type { QuestionCard } from '../type';

export const useEditQuestion = (id?: string) => {
  const router = useRouter();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: QuestionCard) => EditQuestions(values, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['question_list', ['question', id]] });
      toast.success('Tahrirlandi');
      router.push(paths.dashboard.two);
    },
    onError: (error: any) => toast.error(`Xatolik yuz berdi ${error.message}`),
  });
  return {
    questionEdit: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
