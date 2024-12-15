'use client'

import { useGetAuthors } from 'src/api/booksAuthor/hooks/useGetAuthor';

import CreateBookView from 'src/sections/books/content/create-book';

// ----------------------------------------------------------------------

export default function Page() {
    const { data, isLoading } = useGetAuthors(1, 100);

    return isLoading ? null : <CreateBookView authors={data} />;
}
