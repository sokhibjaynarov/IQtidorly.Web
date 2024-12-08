'use client';

import type { Quizess } from 'src/api/quizess/type';

import { useTranslation } from 'react-i18next';

import { Box, Grid, Typography } from '@mui/material';

import { useGetQuizess } from 'src/api/quizess/hooks/useGetQuizess';

import { QuizCard } from './card';

export function QuizListView() {
  const { t } = useTranslation();
  const { data: quiz, isLoading } = useGetQuizess(0, 10, 'olympiad');

  return (
    <Box
      sx={{
        mt: 3,
        gap: 5,
        pt: { xl: 2, lg: 5, md: 2, sm: 3, xs: 3 },
        pl: { xl: 10, lg: 10, md: 10 },
        pr: { xl: 10, lg: 10, md: 10 },
        overflow: 'hidden',
      }}
    >
      <Typography variant="h2" sx={{ mb: 4 }}>
        {t('olympics')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 9, color: 'text.secondary', whiteSpace: 'pre-line' }}>
        {t('olympicsDesc')}
      </Typography>
      <Grid container spacing={5}>
        {!isLoading &&
          quiz.map((olympiad: Quizess, index: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <QuizCard {...olympiad} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
