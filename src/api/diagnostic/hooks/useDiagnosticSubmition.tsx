import { useMutation } from '@tanstack/react-query';

import { queryClient } from 'src/service/react-query';

import { toast } from 'src/components/snackbar';

import { DiagnosticSubmission } from '../api';

import type { DiagnosticSumbit } from '../type';

export const useDiagnosticSubmition = (attempt_id: string) => {
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (values: DiagnosticSumbit) => DiagnosticSubmission(attempt_id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagnostic'] });
    },
    onError: (error: any) => toast.error(`Xatolik yuz berdi ${error.message}`),
  });
  return {
    diagnosticSubmission: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
