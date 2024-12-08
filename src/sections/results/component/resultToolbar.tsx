import React from 'react';

import { Stack, Button, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

export function ResultToolbarView() {
  const router = useRouter();
  const handleMainPage = () => {
    router.push('/students');
  };
  return (
    <Stack
      spacing={1}
      height={115}
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems={{ md: 'center', xs: 'start' }}
    >
      <Stack spacing={2} direction="row" alignItems="center">
        <Stack spacing={0.5}>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="h4">Sizning natijalaringiz</Typography>
          </Stack>

          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Bundan tashqari siz o’z natijalaringizni profilingizda ham ko’rishingiz mumkin
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        <Button fullWidth variant="soft" sx={{ width: 185, height: 48 }} onClick={handleMainPage}>
          Bosh sahifa
        </Button>
      </Stack>
    </Stack>
  );
}
