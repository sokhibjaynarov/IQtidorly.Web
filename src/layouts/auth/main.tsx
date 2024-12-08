import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { layoutClasses } from 'src/layouts/classes';

// ----------------------------------------------------------------------

type MainProps = BoxProps & {
  layoutQuery: Breakpoint;
};

export function Main({ sx, children, layoutQuery, ...other }: MainProps) {
  const theme = useTheme();

  const renderContent = (
    <Box
      sx={{
        py: 5,
        px: 3,
        width: 1,
        borderRadius: 2,
        display: 'flex',
        flexDirection: { xl: 'row', md: 'row', sm: 'column', xs: 'column' },
        gap: 5,
        justifyContent: 'center',
        maxWidth: 'var(--layout-main-content-width)',
      }}
    >
      {children}
    </Box>
  );

  return (
    <Box
      component="main"
      className={layoutClasses.main}
      sx={{
        px: 2,
        py: 5,
        zIndex: 9,
        display: 'flex',
        flex: '1 1 auto',
        alignItems: 'center',
        flexDirection: { xl: 'row', md: 'row', sm: 'column', xs: 'column' },
        justifyContent: 'center',
        [theme.breakpoints.up(layoutQuery)]: {
          px: 0,
          py: 'calc(var(--layout-header-desktop-height))',
        },
        ...sx,
      }}
      {...other}
    >
      {renderContent}
    </Box>
  );
}
