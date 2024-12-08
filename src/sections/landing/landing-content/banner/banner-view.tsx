import { useTranslation } from 'react-i18next';

import { Box, Button, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';

import { Image } from 'src/components/image';
// ----------------------------------------------------------------------

export function BannerView() {
  const { t } = useTranslation();
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
        flexDirection: { xs: 'column', md: 'row' },
        backgroundColor: '#5BE49B',
        overflow: 'hidden',
        backgroundImage: `url(/assets/Pattern.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box sx={{ maxWidth: '100%' }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#fff', lineHeight: 1.2 }}>
          {t('bannertext')}
        </Typography>

        <Typography
          variant="h4"
          sx={{ mt: { xl: 5, lg: 5, md: 2, sm: 3, xs: 3 }, color: '#fff', whiteSpace: 'pre-line' }}
        >
          {t('bannerDesc')}
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: { xl: 5, lg: 5, md: 2, sm: 3, xs: 3 },
            bgcolor: '#fff',
            color: '#5BE49B',
            '&:hover': { bgcolor: '#f0f0f0' },
            width: 163,
          }}
        >
          {t('signIn')}
        </Button>
      </Box>
      <Box>
        <Image
          src={`${CONFIG.site.basePath}/assets/boy-with-book.svg`}
          alt="Kid holding books"
          sx={{
            bottom: 0,
            height: { sm: 350, md: 607 },
            width: { sm: 350, md: 600 },
          }}
        />
      </Box>
    </Box>
  );
}
