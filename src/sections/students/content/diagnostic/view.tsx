'use client';

import type { Quizess } from 'src/api/quizess/type';

import { Box, Grid, Typography } from '@mui/material';

import { useGetQuizess } from 'src/api/quizess/hooks/useGetQuizess';

import { DiagnosticCard } from './card';

export function DiagnosticListView() {
  const { data: diagnostic, isLoading } = useGetQuizess(0, 10, 'diagnostic');

  console.log(diagnostic);
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
        Diagnostik testlar
      </Typography>
      <Typography variant="body1" sx={{ mb: 9, color: 'text.secondary' }}>
        5-11 sinf oʻquvchilari uchun fan olimpiadalari uchun Oʻzbekistondagi <br /> eng birinchi
        platforma
      </Typography>
      <Grid container spacing={5}>
        {!isLoading &&
          diagnostic.map((olympiad: Quizess, index: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <DiagnosticCard {...olympiad} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
