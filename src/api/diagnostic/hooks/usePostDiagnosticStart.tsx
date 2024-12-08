import { useMutation } from '@tanstack/react-query';

import { toast } from 'src/components/snackbar';

import { DiagnosticStart } from '../api';

import type { DiagnosticPost } from '../type';

export const usePostDiagnosticStart = () => {
  const mutation = useMutation({
    mutationFn: async (values: DiagnosticPost) => {
      const response = await DiagnosticStart(values);
      return response.data.data;
    },
    onError: (error: any) => toast.error(`Xatolik yuz berdi: ${error.message}`),
  });

  return {
    diagnosticStart: mutation.mutateAsync,
    ...mutation,
  };
};
