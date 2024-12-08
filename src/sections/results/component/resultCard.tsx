import React, { useState, useEffect } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Card, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useParams } from 'src/routes/hooks';

import { useGetQuizSubmission } from 'src/api/quiz-submission/hooks/useGetQuizSubmission';

interface Props {
  icon: any;
  value: number | string;
  label: string;
  valueColor: string;
  iconBgColor: string;
}

const ResultCard = ({ icon, value, label, iconBgColor, valueColor }: Props) => (
  <Card
    sx={{
      display: 'flex',
      alignItems: 'left',
      height: { md: 238, xs: '100%' },
      width: { md: 398, xs: '100%' },
      p: 2,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      mt: { xs: 2 },
      borderRadius: 3,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'left',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          bgcolor: iconBgColor,
          width: 50,
          height: 50,
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mr: 7,
        }}
      >
        {icon}
      </Box>
      <Stack spacing={0.5}>
        <Typography
          variant="h2"
          sx={{
            color: valueColor,
            mb: 1,
          }}
        >
          {value}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#6c757d',
          }}
        >
          {label}
        </Typography>
      </Stack>
    </Box>
  </Card>
);

export function ResultCardsView() {
  const { id } = useParams();

  const { data } = useGetQuizSubmission(id as string);
  const [timeTaken, setTimeTaken] = useState('');

  useEffect(() => {
    if (data?.start_time && data?.submit_time) {
      const startTime = new Date(data?.start_time).getTime();
      const submitTime = new Date(data?.submit_time).getTime();
      const timeTakenMillis = submitTime - startTime;

      const hours = Math.floor(timeTakenMillis / (1000 * 60 * 60));
      const minutes = Math.floor(timeTakenMillis / (1000 * 60));
      const seconds = Math.floor((timeTakenMillis % (1000 * 60)) / 1000);

      setTimeTaken(`${hours}:${minutes}:${seconds}`);
    }
  }, [data?.start_time, data?.submit_time]);
  return (
    <Stack
      spacing={2.5}
      pl={{ md: 12 }}
      height={{ md: 300, sx: '100&' }}
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-evanly"
      alignItems={{ md: 'center', xs: 'center' }}
    >
      <ResultCard
        icon={<CheckCircleIcon sx={{ color: '#00A76F', fontSize: '21px' }} />}
        value={`${data?.correct_count}/${data?.question_count}`}
        label="To'g'ri javoblar"
        iconBgColor="#D6F1E8"
        valueColor="#00A76F"
      />
      <ResultCard
        icon={<CancelIcon sx={{ color: '#FF5630', fontSize: '21px' }} />}
        value={`${data?.wrong_count}/${data?.question_count}`}
        label="Noto'g'ri javoblar"
        iconBgColor="error.lighter"
        valueColor="#FF5630"
      />
      <ResultCard
        icon={<AccessTimeIcon sx={{ color: '#ffc107', fontSize: '21px' }} />}
        value={timeTaken}
        label="Sarflangan vaqt"
        iconBgColor="warning.lighter"
        valueColor="#212529"
      />
    </Stack>
  );
}
