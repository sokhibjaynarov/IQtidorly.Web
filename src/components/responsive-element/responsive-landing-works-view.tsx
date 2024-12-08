import Image from 'next/image';

import { styled } from '@mui/material';

export const ViewImage = styled(Image)(({ theme }) => ({
  [theme.breakpoints.between(600, 800)]: {
    width: '300px',
    height: '300px',
  },
  [theme.breakpoints.between(800, 1024)]: {
    width: '400px',
    height: '400px',
  },
}));
