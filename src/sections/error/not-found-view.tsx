'use client';

import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { SimpleLayout } from 'src/layouts/error';
import { ComingSoonIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function NotFoundView() {
  return (
    <SimpleLayout content={{ compact: true }}>
      <Container component={MotionContainer}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Coming soon...
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ComingSoonIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    </SimpleLayout>
  );
}
