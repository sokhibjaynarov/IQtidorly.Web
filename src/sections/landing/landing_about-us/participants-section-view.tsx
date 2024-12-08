'use client';

import { useTranslation } from 'react-i18next';

import { Box, Card, Grid, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';

import { Image } from 'src/components/image';

const participants = [
  {
    name: 'Asilbek Odilov',
    location: "Far'ona viloyati Bag'dod tumani 9-sinf o'quvchisi",
    text: "I  totally agree with your points here. It's so important to consider all sides of the issueI totally agree with your points here. It's so important to consider all sides of the issue",
    image: `${CONFIG.site.basePath}/assets/images/proud.svg`,
    bgColor: '#D6F1E8',
    textBgColor: '#BCE8DA',
  },
  {
    name: 'Shaxzoda Qodirova',
    location: "Far'ona viloyati Bag'dod tumani 9-sinf o'quvchisi",
    text: "I  totally agree with your points here. It's so important to consider all sides of the issueI totally agree with your points here. It's so important to consider all sides of the issue",
    image: `${CONFIG.site.basePath}/assets/images/proud-girl.svg`,
    bgColor: '#E1F5FE',
    textBgColor: '#C5EFF6',
  },
  {
    name: 'Asilbek Odilov',
    location: "Far'ona viloyati Bag'dod tumani 9-sinf o'quvchisi",
    text: "I  totally agree with your points here. It's so important to consider all sides of the issueI totally agree with your points here. It's so important to consider all sides of the issue",
    image: `${CONFIG.site.basePath}/assets/images/proud-girl.svg`,
    bgColor: '#FFEBEE',
    textBgColor: '#FFC8BB',
  },
  {
    name: 'Asilbek Odilov',
    location: "Far'ona viloyati Bag'dod tumani 9-sinf o'quvchisi",
    text: "I  totally agree with your points here. It's so important to consider all sides of the issueI totally agree with your points here. It's so important to consider all sides of the issue",
    image: `${CONFIG.site.basePath}/assets/images/proud.svg`,
    bgColor: '#FFF8E1',
    textBgColor: '#FFECC5',
  },
];
function ParticipantsSectionView() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        mt: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
        {t('participants')}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, color: 'text.secondary' }}>
        {t('classDesc')}
      </Typography>
      <Grid container spacing={3}>
        {participants.map((participant, index) => (
          <Grid item xs={12} md={12} sm={12} lg={6} key={index} sx={{ width: 610 }}>
            <Card
              sx={{
                gap: 5,
                display: 'flex',
                position: 'relative',
                textAlign: { xs: 'left', md: 'left' },
                flexDirection: { xs: 'column', md: 'row' },
                backgroundColor: participant.bgColor,
                alignItems: { md: 'right', xl: 'right' },
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  mt: { lg: 3, md: 1, sm: 1, xs: 3 },
                  ml: { lg: 3, md: 1, sm: 1, xs: 3 },
                }}
              >
                <Typography variant="h3">{participant.name}</Typography>

                <Typography
                  variant="body2"
                  sx={{
                    p: 0.3,
                    my: 1.5,
                    px: 1,
                    bgcolor: participant.textBgColor,
                    display: 'inline-block',
                    borderRadius: 1,
                  }}
                >
                  {t('studentLocation')}
                </Typography>

                <Typography variant="body2">{t('studentDesc')}</Typography>
              </Box>

              <Image src={participant.image} alt={participant.name} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ParticipantsSectionView;
