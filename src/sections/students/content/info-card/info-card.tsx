import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import { bgGradient } from 'src/theme/styles';

import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

export default function InfoCard() {
  return (
    <Box
      sx={{
        mt: 3,
        gap: 5,
        borderRadius: 4,
        display: 'flex',
        height: { md: 1 },
        position: 'relative',
        alignItems: 'left',
        pt: { lg: 5, sm: 3, xs: 3, md: 5, xl: 5 },
        pl: { lg: 5, sm: 3, xs: 3, md: 5, xl: 5 },
        textAlign: { xs: 'left', md: 'left' },
        color: 'common.white',
        flexDirection: { xs: 'column', md: 'row' },
        ...bgGradient({
          color: ` to left,rgba(20, 26, 33, 0.8) , rgba(20, 26, 33, 0.7) `,
          imgUrl: '/assets/background/descriptin-card2.svg',
        }),
      }}
    >
      <Box>
        <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#fff', lineHeight: 1.2 }}>
          Matematika fani bo’yicha yangi olimpiadaga <br /> start berildi
        </Typography>
        <Typography variant="h6" sx={{ mt: { xl: 5, lg: 5, md: 2, sm: 3, xs: 3 }, color: '#fff' }}>
          Matematika fani bo’yicha o’tkazilayotgan olimpiadada hoziroq qatnashing!
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: { xl: 5, lg: 5, md: 2, sm: 3, xs: 3 },
            color: 'primary',
            width: 163,
          }}
        >
          Boshlash
        </Button>
      </Box>

      <Image
        src="/assets/images/calc.svg"
        alt="math"
        sx={{ display: { md: 'flex', xs: 'none' } }}
      />
    </Box>
  );
}
