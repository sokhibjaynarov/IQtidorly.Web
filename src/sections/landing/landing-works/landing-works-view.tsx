'use client';

import { useTranslation } from 'react-i18next';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Card, Grid, Button, styled, Typography } from '@mui/material';

import { Image } from 'src/components/image';

const Text = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  textAlign: 'left',
  [theme.breakpoints.up('md')]: {},
}));

const HowItWorksSection = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        mt: 10,
        mb: 10,
      }}
    >
      <Text variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'left' }}>
        {t('attend')}
      </Text>
      <Typography
        variant="subtitle1"
        sx={{ mb: 4, textAlign: 'left', color: 'text.secondary', whiteSpace: 'pre-line' }}
      >
        {t('platform')}
      </Typography>
      <Grid container spacing={10} justifyContent="center" sx={{ position: 'relative', mb: 12 }}>
        <Grid item xs={12} md={4} sx={{ zIndex: 10 }}>
          <Card
            sx={{
              height: 255,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#FFFFFF',
              position: 'relative',
              textAlign: 'center',
              p: 2,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: 72,
                fontWeight: 'bold',
                position: 'absolute',
                top: 16,
                left: 16,
                color: '#E0E0E0',
              }}
            >
              01
            </Typography>
            <Typography variant="body1" sx={{ mt: 8, zIndex: 1 }}>
              {t('howAttendSt')}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} sx={{ zIndex: 10 }}>
          <Card
            sx={{
              height: 255,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#FFFFFF',
              position: 'relative',
              textAlign: 'center',
              p: 2,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: 72,
                fontWeight: 'bold',
                position: 'absolute',
                top: 16,
                left: 16,
                color: '#E0E0E0',
              }}
            >
              02
            </Typography>
            <Typography variant="body1" sx={{ mt: 8, zIndex: 1 }}>
              {t('howAttendNd')}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} sx={{ zIndex: 10 }}>
          <Card
            sx={{
              height: 255,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#FFFFFF',
              position: 'relative',
              textAlign: 'center',
              p: 2,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: 72,
                fontWeight: 'bold',
                position: 'absolute',
                top: 16,
                left: 16,
                color: '#E0E0E0',
              }}
            >
              03
            </Typography>
            <Typography variant="body1" sx={{ mt: 8, zIndex: 1 }}>
              {t('howAttendRd')}
            </Typography>
          </Card>
        </Grid>
        <Image
          src="/assets/background/brain.svg"
          width={200}
          height={240}
          alt="brain"
          style={{ position: 'absolute', right: 0, top: -90 }}
        />
        <Image
          src="/assets/background/light.svg"
          width={200}
          height={240}
          alt="brain"
          style={{ position: 'absolute', left: 80, bottom: -135 }}
        />
      </Grid>

      <Box
        sx={{
          mt: 6,
          borderRadius: 2,
          bgcolor: '#FFF8E1',
          gap: 5,
          display: 'flex',
          height: { md: 1 },
          position: 'relative',
          alignItems: 'left',
          pt: { lg: 5, sm: 3, xs: 3, md: 5, xl: 5 },
          pl: { lg: 5, sm: 3, xs: 3, md: 5, xl: 5 },
          textAlign: { xs: 'left', md: 'left' },
          flexDirection: { xs: 'column', md: 'row' },
          overflow: 'hidden',
        }}
      >
        <Box sx={{ flex: 1, zIndex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4, whiteSpace: 'pre-line' }}>
            {t('parents')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CheckCircleIcon sx={{ color: '#FFAB00', mr: 1 }} />
            <Typography variant="body1">{t('parentsDescSt')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CheckCircleIcon sx={{ color: '#FFAB00', mr: 1 }} />
            <Typography variant="body1">{t('parentsDescNd')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CheckCircleIcon sx={{ color: '#FFAB00', mr: 1 }} />
            <Typography variant="body1">{t('parentsDescRd')}</Typography>
          </Box>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            {t('participation')}
          </Button>
        </Box>

        <Image src="/assets/images/family.svg" alt="Family" />
      </Box>
    </Box>
  );
};

export default HowItWorksSection;
