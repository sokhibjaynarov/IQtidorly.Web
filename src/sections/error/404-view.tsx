'use client';

import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';
import { SimpleLayout } from 'src/layouts/error';

import { Image } from 'src/components/image';
import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function View404() {
  return (
    <SimpleLayout content={{ compact: false }}>
      <Container component={MotionContainer}>
        <m.div variants={varBounce().in}>
          <Image
            sx={{ my: { xs: 5, sm: 5 } }}
            src={`${CONFIG.site.basePath}/assets/images/404.png`}
          />
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Bu sahifa topilmadi!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Qandaydir xatolik yuz bergan yoki internetga ulanishdagi muammo bor. Iltimos keyinroq
            urinib ko’ring
          </Typography>
        </m.div>
        <Button component={RouterLink} href="/" size="large" variant="contained" color="primary">
          Bosh sahifa
        </Button>
      </Container>
    </SimpleLayout>
  );
}
