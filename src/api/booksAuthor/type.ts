export interface BooksAuthor {
  _id?: string;
  name: string;
  surname: string;
  photo_path: string;
}

export interface AuthorImg {
  _id?: string;
  photo_path?: string | File | null;
  name: string;
  surname: string;
}
