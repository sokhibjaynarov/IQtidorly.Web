'use client';

import { useParams } from 'next/navigation';

import { useGetEditQuestions } from 'src/api/question/hooks/useGetQuestionEdit';

import CreateTestView from 'src/sections/questions/content/create-test';

// ----------------------------------------------------------------------

export default function Page() {
  const id = useParams().id as string;

  const { data: questionEdit, isLoading } = useGetEditQuestions(id);

  return !isLoading ? questionEdit && <CreateTestView currentQuestion={questionEdit} /> : null;
}
