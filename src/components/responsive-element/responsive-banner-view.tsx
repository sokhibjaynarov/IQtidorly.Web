import Image from 'next/image';

import { Box, styled, Typography } from '@mui/material';

import { theme } from 'src/sections/landing/style';

export const ResponsiveBannerImage = styled(Image)(() => ({
  [theme.breakpoints.down(800)]: {
    diplay: 'none',
  },
  [theme.breakpoints.up(1100)]: {
    bottom: 0,
    position: 'absolute',
    right: 0,
  },
}));

export const BannerText = styled(Typography)(() => ({
  [theme.breakpoints.between(600, 800)]: {
    fontSize: '1.7rem',
  },
}));

export const BannerTextTwo = styled(Typography)(() => ({
  [theme.breakpoints.between(600, 800)]: {
    fontSize: '1rem',
    marginTop: '20px',
  },
}));

export const BoxBanner = styled(Box)(() => ({
  [theme.breakpoints.between(600, 800)]: {
    marginTop: '100px',
  },
}));
