import { Box } from '@mui/material';

import { QuizListView } from './quiz/quiz-view';
import { BannerView } from './banner/banner-view';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
};

export function LandingContentView({ title = 'Blank' }: Props) {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <BannerView />
      </Box>

      <Box
        sx={{
          mt: 10,
          pb: 18,
          backgroundImage: 'url(/assets/book.png), url(/assets/loop.png), url(/assets/book2.png)',
          backgroundPosition: 'top right , left center, bottom right',
          backgroundSize: 'auto, auto, auto',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
        }}
      >
        <QuizListView />
      </Box>
    </>
  );
}
