'use client';

import { Box, Container } from '@mui/material';

import { QuizListView } from './content/quiz/view';
import SubscriptionFormSection from '../landing/landing-reg-quiz/landing-reg-quiz-view';

// ----------------------------------------------------------------------

export function StundentView() {
  return (
    <Box>
      {/* <Box display="flex" justifyContent="center" alignItems="center">
        <InfoCard />
      </Box> */}

      <Container maxWidth="xl" sx={{ mb: 10 }}>
        <QuizListView />
      </Container>

      {/* <Container maxWidth="xl" sx={{ mt: 10, mb: 10 }}>
        <DiagnosticListView />
      </Container> */}
      <Box
        sx={{
          bgcolor: '#fff',
          pt: 2,
          pb: 6,
          mb: 13,
          backgroundImage: 'url(/assets/sunglass.png), url(/assets/book3.png)',
          backgroundPosition: 'right top, top 75% left 50%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container maxWidth="xl">
          <SubscriptionFormSection />
        </Container>
      </Box>
    </Box>
  );
}
