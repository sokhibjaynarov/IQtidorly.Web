import { getBook } from '../books/adapter';
import { OrderStatus, type MyBalance } from './type';

export const getMyBlance = (item?: MyBalance) => ({
  _id: item?._id ?? '',
  user: item?.user ?? '',
  book: getBook(item?.book),
  status: item?.status ?? OrderStatus.ReadyForPayment,
  create_time: item?.create_time ?? new Date(),
});

export const getMyBlances = (data?: MyBalance[]) =>
  data?.length ? data.map((item) => getMyBlance(item)) : [];
