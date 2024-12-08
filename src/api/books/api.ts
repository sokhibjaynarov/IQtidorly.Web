import axiosInstance from 'src/utils/axios';

import type { InputBook, CreateBookOrder } from './type';

export const CreateBooks = async (values: InputBook) => axiosInstance.post(`books`, values);

export const CreateBookOrders = async (values: CreateBookOrder) =>
  axiosInstance.post(`orders`, values);

export const GetBooks = async (page: number, limit: number) =>
  axiosInstance.get(`books?page=${page + 1}&limit=${limit}`);

export const DeleteBook = async (id?: string) => axiosInstance.delete(`books/${id}`);

export const EditBooks = async (values: InputBook, id?: string) =>
  axiosInstance.put(`books/${id}`, values);

export const GetEditBook = async (id?: string) => axiosInstance.get(`books/${id}`);
