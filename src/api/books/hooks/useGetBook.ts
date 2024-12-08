import type { MyBalance } from 'src/api/profile/type';

import { get } from 'lodash';
import { useQuery } from '@tanstack/react-query';

import { GetMyBlance } from 'src/api/profile/api';

import { GetBooks } from '../api';
import { getBookList } from '../adapter';

import type { Books } from '../type';

export const useGetBooks = (page: number, limit: number) => {
  const initialData = {
    data: getBookList(),
    pagination: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['books', page, limit],
    queryFn: async () => {
      let myBalance = [];
      try {
        const balanceResponse = await GetMyBlance();
        myBalance = balanceResponse?.data?.data || [];
      } catch (error) {
        /* empty */
      }

      const books = await GetBooks(page, limit);
      const booksData = books?.data?.data || [];

      const convertedData = booksData.map((book: Books) => ({
        ...book,
        is_paid: myBalance.some((item: MyBalance) => item.book._id === book._id),
      }));

      return {
        books: convertedData,
        pagination: books?.data?.pagination || null,
      };
    },
    select: (books) => ({
      data: getBookList(get(books, 'books')),
      pagination: get(books, 'pagination'),
    }),
    retry: 0,
  });

  return {
    ...data,
    ...args,
  };
};
