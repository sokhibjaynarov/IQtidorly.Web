'use client';

import { Box, Container } from '@mui/material';

import { varAlpha } from 'src/theme/styles';

import { ResultCardsView } from './component/resultCard';
import { ResultToolbarView } from './component/resultToolbar';

// ----------------------------------------------------------------------

export function ResultView() {
  return (
    <Box
      sx={{
        bgcolor: (theme) => varAlpha(theme.vars.palette.grey['800Channel'], 0.06),
        height: '100vh',
      }}
    >
      <Box sx={{ mt: 2, py: 0.2, bgcolor: '#fff' }}>
        <Container maxWidth="xl">
          <ResultToolbarView />
        </Container>
      </Box>
      <Box>
        <Container maxWidth="xl">
          <ResultCardsView />
        </Container>
      </Box>
    </Box>
  );
}
