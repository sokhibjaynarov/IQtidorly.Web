import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

// ----------------------------------------------------------------------

type SectionProps = BoxProps & {
  title?: string;
  method?: string;
  imgUrl?: string;
  subtitle?: string;
  children?: React.ReactNode;
  layoutQuery: Breakpoint;
  methods?: {
    path: string;
    icon: string;
    label: string;
  }[];
};

export function Section({
  sx,
  method,
  layoutQuery,
  methods,
  title = 'Manage the job',
  imgUrl = `${CONFIG.site.basePath}/assets/illustrations/illustration-dashboard.webp`,
  subtitle = 'More effectively with optimized workflows.',
  children,
  ...other
}: SectionProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: `135deg, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.8)}, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.8)}`,
          imgUrl: `${CONFIG.site.basePath}/assets/background/background-3-blur.webp`,
        }),
        px: 3,
        pb: 3,

        width: '100%',
        height: '100vh',
        position: 'relative',
        pt: 'var(--layout-header-desktop-height)',
        [theme.breakpoints.up(layoutQuery)]: {
          gap: 8,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
