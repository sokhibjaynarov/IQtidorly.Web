import axiosInstance from 'src/utils/axios';

import type { BooksAuthor } from './type';


export const CreateAuthors = async (values: BooksAuthor) =>
    axiosInstance.post(`book-authors`, values);

export const GetAuthors = async (page: number, limit: number) =>
    axiosInstance.get(`book-authors?page=${page + 1}&limit=${limit}`);

export const DeleteAuthor = async (id?: string) =>
    axiosInstance.delete(`book-authors/${id}`);

export const EditAuthors = async (values: BooksAuthor, id?: string) =>
    axiosInstance.put(`book-authors/${id}`, values);

export const GetEditAuthor = async (id?: string) => axiosInstance.get(`book-authors/${id}`);