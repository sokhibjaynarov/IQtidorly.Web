'use client';

import { useParams } from 'next/navigation';

import { useGetEditBooks } from 'src/api/books/hooks/useGetBookEdit';
import { useGetAuthors } from 'src/api/booksAuthor/hooks/useGetAuthor';

import CreateBookView from 'src/sections/books/content/create-book';



// ----------------------------------------------------------------------

export default function Page() {
    const id = useParams().id as string;

    const { data: bookEdit, isLoading } = useGetEditBooks(id);
    const { data, isLoading: isLoadingAuthors } = useGetAuthors(1, 100);

    return isLoading || isLoadingAuthors ? null : bookEdit && <CreateBookView currentBook={bookEdit} authors={data} />;
}
