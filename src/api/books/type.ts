interface Author {
  _id: string;
  name: string;
  surname: string;
  photo_path: string;
}

export interface Books {
  _id?: string;
  title: string;
  total_page: number;
  description: string;
  price: number;
  is_paid: boolean;
  author: Author;
  cover_path: string;
  short_description_file_path: string;
  full_description_file_path: string;
}

export interface InputBook {
  _id?: string;
  title: string;
  total_page: number;
  description: string;
  price: number;
  author: string;
  cover: string | File | null;
  short_description: string | File | null;
  full_description: string | File | null;
}

export interface CreateBookOrder {
  user: string;
  book: string;
  amount: number;
}
