import type { Breakpoint } from '@mui/material/styles';
import type { NavSectionProps } from 'src/components/nav-section';

import Box from '@mui/material/Box';

import { NavSectionHorizontal } from 'src/components/nav-section';

// ----------------------------------------------------------------------

export type NavHorizontalProps = NavSectionProps & {
  layoutQuery: Breakpoint;
};

export function NavHorizontal({ data, layoutQuery, sx, ...other }: NavHorizontalProps) {
  return (
    <Box
      sx={{
        width: 1,
        position: 'relative',
        flexDirection: 'column',
        display: { xs: 'none', [layoutQuery]: 'flex' },

        ...sx,
      }}
    >
      <Box
        sx={{
          px: 0,
          height: 'var(--layout-nav-horizontal-height)',
          backgroundColor: 'var(--layout-nav-horizontal-bg)',
          backdropFilter: `blur(var(--layout-header-blur))`,
          WebkitBackdropFilter: `blur(var(--layout-header-blur))`,
        }}
      >
        <NavSectionHorizontal data={data} {...other} />
      </Box>
    </Box>
  );
}
