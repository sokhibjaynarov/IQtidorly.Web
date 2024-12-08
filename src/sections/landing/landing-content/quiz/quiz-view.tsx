'use client';

import { useTranslation } from 'react-i18next';

import { Box, Grid, Typography } from '@mui/material';

import { QuizCard } from './quiz-card';

export function QuizListView() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        mt: 3,
        gap: 3,
        pt: { xl: 2, lg: 5, md: 2, sm: 3, xs: 3 },
        overflow: 'hidden',
      }}
    >
      <Typography variant="h2" sx={{ mb: 4 }}>
        {t('olympics')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 9, color: 'text.secondary', whiteSpace:'pre-line' }}>
        {t('olympicsDesc')}
      </Typography>
      <Grid container spacing={5}>
        {[
          {
            imageSrc: '/assets/images/image2.png',
            title: 'Matematika olimpiadasi',
            description:
              "Sa'di Hasanovich Sirojiddinov nomidagi respublika matematika turnirining ",
            grade: 'yakuniy bosqichi',
            date: '17.08.2024',
            buttonText: 'Ishtirok etish',
          },
        ].map((olympiad, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <QuizCard {...olympiad} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
