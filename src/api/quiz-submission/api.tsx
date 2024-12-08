import axiosInstance from 'src/utils/axios';

export const GetQuizSubmission = async (id: string) =>
  axiosInstance.get(`quiz-submissions/result/${id}`);

export const QuizSubmissionClose = async (id: string) =>
  axiosInstance.post(`quiz-submissions/close/${id}`);
