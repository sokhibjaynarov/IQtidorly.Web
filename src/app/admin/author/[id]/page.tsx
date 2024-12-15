'use client';

import { useParams } from 'next/navigation';

import { useGetEditAuthors } from 'src/api/booksAuthor/hooks/useGetAuthorEdit';

import CreateAuthorView from 'src/sections/authors/content/create-author';

// ----------------------------------------------------------------------

export default function Page() {
    const id = useParams().id as string;

    const { data: authorEdit, isLoading } = useGetEditAuthors(id);

    return !isLoading ? authorEdit && <CreateAuthorView currentAuthor={authorEdit} /> : null;
}
