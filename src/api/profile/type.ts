import type { Books } from '../books/type';

export interface MyBalance {
  _id: string;
  user: string;
  book: Books;
  status: OrderStatus;
  create_time: Date;
}

export enum OrderStatus {
  ReadyForPayment = 'ready_for_payment',
  Paid = 'paid',
}
