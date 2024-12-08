'use client';

import type { Theme, SxProps } from '@mui/material/styles';

import { Main, CompactContent } from './main';
import { LayoutSection } from '../core/layout-section';

// ----------------------------------------------------------------------

export type SimpleLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  content?: {
    compact?: boolean;
  };
};

export function SimpleLayout({ sx, children, content }: SimpleLayoutProps) {
  return (
    <LayoutSection
      cssVars={{
        '--layout-simple-content-compact-width': '346px',
      }}
      sx={sx}
    >
      <Main>{content?.compact ? <CompactContent>{children}</CompactContent> : children}</Main>
    </LayoutSection>
  );
}
