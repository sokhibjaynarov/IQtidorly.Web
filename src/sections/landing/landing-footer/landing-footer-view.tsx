'use client';

import { useTranslation } from 'react-i18next';

import { Box, Grid, Link, Container, Typography } from '@mui/material';

import { Logo } from 'src/components/logo';
import { Image } from 'src/components/image';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        backgroundColor: '#f9f9f9',
        py: 6,
        backgroundImage: 'url(/assets/1991.png), url(/assets/1992.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top right, bottom left',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Logo width={270} height={60} />
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 2, maxWidth: 270 }}>
              {t('footerDesc')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                pt: 2,
              }}
            >
              <Link href="https://t.me/iqtidorly" target="_blank">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#fff',
                    borderRadius: '50%',
                    border: 0.5,
                    borderColor: 'grey.500',
                  }}
                >
                  <Image
                    src="/assets/telegram.png"
                    alt="telegram"
                    sx={{
                      width: 27,
                      height: 27,
                    }}
                  />
                </Box>
              </Link>
              <Link href="https://www.instagram.com/IQtidorly" target="_blank">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: '#fff',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    border: 0.5,
                    borderColor: 'grey.500',
                  }}
                >
                  <Image
                    src="/assets/instagram.png"
                    alt="instagram"
                    sx={{
                      width: 27,
                      height: 27,
                    }}
                  />
                </Box>
              </Link>
              <Link href="https://linkedin.com/company/iqtidorly/" target="_blank">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: '#fff',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    border: 0.5,
                    borderColor: 'grey.500',
                  }}
                >
                  <Image
                    src="/assets/linkedin.png"
                    alt="linkedin"
                    sx={{
                      width: 27,
                      height: 27,
                    }}
                  />
                </Box>
              </Link>
              <Link href="https://www.youtube.com/@IQtidorly" target="_blank">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: '#fff',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    border: 0.5,
                    borderColor: 'grey.500',
                  }}
                >
                  <Image
                    src="/assets/youtube.png"
                    alt="youtube"
                    sx={{
                      width: 27,
                      height: 27,
                    }}
                  />
                </Box>
              </Link>
              <Link href="https://x.com/IQtidorly" target="_blank">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#fff',
                    borderRadius: '50%',
                    border: 0.5,
                    borderColor: 'grey.500',
                  }}
                >
                  <Image
                    src="/assets/xSocial.png"
                    alt="xSocial"
                    sx={{
                      width: 27,
                      height: 27,
                    }}
                  />
                </Box>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              {t('main')}
            </Typography>
            <Typography variant="body1" mt={2}>
              <Link href="#" color="inherit" underline="none">
                {t('diagnostik')}
              </Link>
            </Typography>
            <Typography variant="body1" mt={2}>
              <Link href="#" color="inherit" underline="none">
                {t('olympics')}
              </Link>
            </Typography>
            <Typography variant="body1" mt={2}>
              <Link href="#" color="inherit" underline="none">
                {t('results')}
              </Link>
            </Typography>
            <Typography variant="body1" mt={2}>
              <Link href="#" color="inherit" underline="none">
                {t('puzzle')}
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              {t('connect')}
            </Typography>
            <Typography variant="body1" mt={2}>
              {t('phone')}
            </Typography>
            <Typography variant="body1" mt={2}>
              {t('gmail')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              {t('address')}
            </Typography>
            <Typography variant="body1" mt={2}>
              {t('addressDesc')}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
