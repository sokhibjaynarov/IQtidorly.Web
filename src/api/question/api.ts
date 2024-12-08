import axiosInstance from 'src/utils/axios';

import type { QuestionCard } from './type';

export const CreateQuetions = async (values: QuestionCard) =>
  axiosInstance.post(`questions`, values);

export const GetQuestions = async (page: number, limit: number) =>
  axiosInstance.get(`questions?page=${page + 1}&limit=${limit}`);

export const DeleteQuestion = async (id?: string) => axiosInstance.delete(`questions/${id}`);

export const EditQuestions = async (values: QuestionCard, id?: string) =>
  axiosInstance.put(`questions/${id}`, values);

export const GetEditQuestion = async (id?: string) => axiosInstance.get(`questions/${id}`);
