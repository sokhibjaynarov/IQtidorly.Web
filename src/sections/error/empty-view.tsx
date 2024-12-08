'use client';

import Image from 'next/image';
import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { SimpleLayout } from 'src/layouts/error';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function EmptyView() {
  return (
    <SimpleLayout content={{ compact: true }}>
      <Container component={MotionContainer}>
        <m.div variants={varBounce().in}>
          <m.div variants={varBounce().in}>
            <Image
              src="/assets/icons/empty/ic-empty-test.svg"
              width={240}
              height={240}
              alt="empty-test"
            />
          </m.div>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Sizda hozirda testlar mavjud emas!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Yangi testlar yaratish uchun “Yangi test qo’shish” tugmasini bosing
          </Typography>
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained" color="primary">
          Yangi test qo’shish
        </Button>
      </Container>
    </SimpleLayout>
  );
}
