import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { Box, Button, Checkbox, TextField, Typography, FormControlLabel } from '@mui/material';

import { Image } from 'src/components/image';

const SubscriptionFormSection = () => {
  const { t } = useTranslation();
  return (
    <Box
    sx={{
      mt: 3,
      gap: 5,

      display: 'flex',
      height: { md: 1 },
      position: 'relative',
      alignItems: 'center',
      pt: { lg: 5, md: 2, sm: 3, xs: 3 },
      pl: { lg: 5, md: 2, sm: 3, xs: 3 },
      textAlign: { xs: 'left', md: 'left' },
      flexDirection: { xs: 'column', md: 'row' },
      overflow: 'hidden',
    }}
  >
    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, whiteSpace:'pre-line' }}>
        {t('newOlypics')}
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 4, color: 'text.secondary' }}>
        {t('classDesc')}
      </Typography>
      <TextField
        fullWidth
        label={t('formName')}
        variant="outlined"
        sx={{ mb: 2, backgroundColor: '#fff' }}
      />
      <TextField
        fullWidth
        label={t('formPhone')}
        variant="outlined"
        sx={{ mb: 2, backgroundColor: '#fff' }}
      />
      <FormControlLabel
        control={<Checkbox name="consent" />}
        label={
          <Box
            sx={{ display: { md: 'flex', xs: 'inline', xl: 'flex', lg: 'flex' }, width: '100%' }}
          >
            <Link href="/fqa" style={{ display: 'inline', color: '#00A76F', fontSize: '16px' }}>
              {t('faq')}
            </Link>
            <Typography ml={0.2} mt={0.1} variant="body1">
            {t('agree')}
            </Typography>
          </Box>
        }
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ width: { xl: 150, md: 150, sm: 150 }, mt: 5 }}
      >
        {t('member')}
      </Button>
    </Box>
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Image
        src="/assets/images/books.svg"
        alt="Books and Graduation Hat"
        sx={{ width: { md: 400, xl: 500, lg: 500 }, height: { md: 400, xl: 500, lg: 500 } }}
      />
    </Box>
  </Box>
  )
}

export default SubscriptionFormSection;
