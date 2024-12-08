'use client';

import { Box, Card, Button, Typography, CardContent, CardActions } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Image } from 'src/components/image';

type QuizCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  grade: string;
  date: string;
  buttonText: string;
};

export const QuizCard = ({
  imageSrc,
  title,
  description,
  grade,
  date,
  buttonText,
}: QuizCardProps) => {
  const router = useRouter();

  return (
    <Card
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardContent sx={{ textAlign: { lg: 'center', md: 'left' } }}>
        <Image src={imageSrc} alt={title} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: { lg: 'center', md: 'left' }, mt: 2 }}>
          <Typography variant="caption" sx={{ bgcolor: '#e0f7fa', borderRadius: 1, px: 1, mr: 1 }}>
            {grade}
          </Typography>
          <Typography variant="caption" sx={{ bgcolor: '#fff3e0', borderRadius: 1, px: 1 }}>
            {date}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: { lg: 'center', md: 'left' } }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ m: 2, width: { xl: 130, lg: 130, md: '100%', xs: '100%' } }}
          onClick={() => router.push(paths.auth.jwt.signIn)}
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};
