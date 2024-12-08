import { useMutation } from '@tanstack/react-query';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';

import { QuizSubmissionClose } from '../api';

export const useQuizSubmissionClose = (attempt_id: string, id: string) => {
  const router = useRouter();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: () => QuizSubmissionClose(id),
    onSuccess: () => {
      toast.success('Muovfaqatli topshirildi');
      router.push(paths.students.result(id, attempt_id));
    },
    onError: (error: any) => toast.error(`Xatolik yuz berdi ${error.message}`),
  });
  return {
    submissionClose: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
