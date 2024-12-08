import type { ButtonProps } from '@mui/material/Button';

import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }: ButtonProps) {
  const { t } = useTranslation();
  return (
    <Button
      fullWidth
      component={RouterLink}
      href={paths.auth.jwt.signIn}
      variant="contained"
      color="primary"
      sx={sx}
      {...other}
    >
      {t('signIn')}
    </Button>
  );
}
