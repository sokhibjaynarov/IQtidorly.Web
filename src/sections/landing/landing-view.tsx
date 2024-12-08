'use client';

import Box from '@mui/material/Box';
import { Container } from '@mui/material';

import { varAlpha } from 'src/theme/styles';

import FAQSection from './landing-fqa/landing-fqa';
import HowItWorksSection from './landing-works/landing-works-view';
import { LandingContentView } from './landing-content/landing-content-view';
import SubscriptionFormSection from './landing-reg-quiz/landing-reg-quiz-view';
import ParticipantsSectionView from './landing_about-us/participants-section-view';

// ----------------------------------------------------------------------

export function LandingView() {
  return (
    <Box sx={{ bgcolor: (theme) => varAlpha(theme.vars.palette.grey['200Channel'], 0.09) }}>
      <Box>
        <Container maxWidth="xl">
          <LandingContentView />
        </Container>
      </Box>
      <Box sx={{ pt: 4, pb: 6, bgcolor: '#fff' }}>
        <Container maxWidth="xl">
          <ParticipantsSectionView />
        </Container>
      </Box>

      <Box>
        <Container maxWidth="xl">
          <HowItWorksSection />
        </Container>
      </Box>
      <Box
        sx={{
          bgcolor: '#fff',
          pt: 2,
          pb: 6,
          mb: 6,
          backgroundImage: 'url(/assets/sunglass.png), url(/assets/book3.png)',
          backgroundPosition: 'right top, top 75% left 50%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container maxWidth="xl">
          <SubscriptionFormSection />
        </Container>
      </Box>
      <Box>
        <Container maxWidth="xl">
          <FAQSection />
        </Container>
      </Box>
    </Box>
  );
}
