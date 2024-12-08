'use client';

import type { Quizess } from 'src/api/quizess/type';

import { Box, Card, Button, Typography, CardContent, CardActions } from '@mui/material';

import { paths } from 'src/routes/paths';

import { fDate } from 'src/utils/format-time';

import { Image } from 'src/components/image';

export const DiagnosticCard = ({ age_group, start_time, uz, _id }: Quizess) => {
  console.log(_id);

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
        <Image
          src={`${process.env.NEXT_PUBLIC_FILE_URL}${uz?.image}`}
          alt={uz?.description}
          height={128}
          width={128}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {uz?.title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          {uz?.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: { lg: 'center', md: 'left' }, mt: 2 }}>
          <Typography variant="caption" sx={{ bgcolor: '#e0f7fa', borderRadius: 1, px: 1, mr: 1 }}>
            {age_group?.name}
          </Typography>
          <Typography variant="caption" sx={{ bgcolor: '#fff3e0', borderRadius: 1, px: 1 }}>
            {fDate(start_time)}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: { lg: 'center', md: 'left' } }}>
        <Button
          variant="contained"
          color="primary"
          href={paths.students.description(_id!)}
          sx={{ m: 2, width: { xl: 130, lg: 130, md: '100%', xs: '100%' } }}
        >
          Ishtork etish
        </Button>
      </CardActions>
    </Card>
  );
};
