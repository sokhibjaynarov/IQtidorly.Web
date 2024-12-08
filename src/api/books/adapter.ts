import type { Books } from './type';

export const getBook = (item?: Books) => ({
  _id: item?._id ?? '',
  title: item?.title ?? '',
  total_page: item?.total_page ?? 0,
  description: item?.description ?? '',
  price: item?.price ?? 0,
  is_paid: item?.is_paid ?? false,
  author: item?.author
    ? {
        _id: item?.author._id ?? '',
        name: item?.author.name ?? '',
        surname: item?.author.surname ?? '',
        photo_path: item?.author.photo_path ?? '',
      }
    : {},
  cover_path: item?.cover_path ?? '',
  short_description_file_path: item?.short_description_file_path ?? '',
  full_description_file_path: item?.full_description_file_path ?? '',
});

export const getBookList = (data?: Books[]) =>
  data?.length ? data.map((item) => getBook(item)) : [];
