'use client';

import { useParams } from 'next/navigation';

import { Box, Container } from '@mui/material';

import { varAlpha } from 'src/theme/styles';
import { useGetQuizQuestion } from 'src/api/quizess/hooks/useGetQuizQuestion';

import QuizCard from './content/quiz-card';
import { QuizTimerView } from './content/quiz-timer';

// ----------------------------------------------------------------------

export function DiagnosticTestView() {
  const { id } = useParams();

  const { data: quiz } = useGetQuizQuestion(id as string);

  return (
    <Box
      sx={{
        bgcolor: (theme) => varAlpha(theme.vars.palette.grey['800Channel'], 0.06),
        height: '100vh',
      }}
    >
      <Box sx={{ mt: 2, py: 0.2, bgcolor: '#fff' }}>
        <Container maxWidth="xl">
          <QuizTimerView
            start_time={quiz?.start_time}
            subject={quiz?.subject}
            age_group={quiz?.age_group}
            end_time={quiz?.end_time}
          />
        </Container>
      </Box>
      <Box>
        <Container maxWidth="xl">
          <QuizCard quizess={quiz} />
        </Container>
      </Box>
    </Box>
  );
}
