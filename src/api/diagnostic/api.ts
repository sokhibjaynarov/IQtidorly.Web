import axiosInstance from 'src/utils/axios';

import type { DiagnosticPost, DiagnosticSumbit } from './type';

export const DiagnosticStart = async (values: DiagnosticPost) =>
  axiosInstance.post(`/quiz-submissions/start`, values);
export const DiagnosticSubmission = async (attempt_id: string, values: DiagnosticSumbit) =>
  axiosInstance.post(`/quiz-submissions/${attempt_id}`, values);
