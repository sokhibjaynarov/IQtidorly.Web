import axiosInstance from 'src/utils/axios';

import type { Quizess } from './type';

export const CreateQuizess = async (values: Quizess) => axiosInstance.post(`/quizzes`, values);

export const GetQuizessList = async (page: number, limit: number, type?: string) =>
  axiosInstance.get(`/quizzes?page=${page + 1}&limit=${limit}&type=${type}`);

export const GetQuiz = async (id: string) => axiosInstance.get(`/quizzes/${id}`);

export const DeleteQuizess = async (id?: string) => axiosInstance.delete(`quizzes/${id}`);

export const RegisterForQuiz = async (id: string) => axiosInstance.post(`quizzes/${id}/register`);

export const GetQuizQuestion = async (id: string) => axiosInstance.get(`quizzes/${id}/questions`);
