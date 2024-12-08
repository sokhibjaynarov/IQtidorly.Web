import React, { useState, useEffect } from 'react';

import { Stack, IconButton, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// Dummy icon, replace with your actual timer icon
const TimerIcon = () => (
  <Iconify icon="eva:clock-outline" style={{ fontSize: 24, color: '#4caf50' }} />
);

interface Subject {
  name: string;
  _id: string;
}
interface AgeGroup {
  name: string;
  _id: string;
  max: number;
  min: number;
}

type Props = {
  start_time?: Date;
  end_time?: Date;
  subject: Subject;
  age_group: AgeGroup;
};

export function QuizTimerView({ start_time, end_time, subject, age_group }: Props) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (end_time) {
      const endTime = new Date(end_time).getTime();
      const currentTime = new Date().getTime();
      const remainingTimeMillis = endTime - currentTime;

      const interval = setInterval(() => {
        const timeDiff = remainingTimeMillis - (new Date().getTime() - currentTime);

        if (timeDiff <= 0) {
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
          clearInterval(interval);
        } else {
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          setTimeLeft({ hours, minutes, seconds });
        }
      }, 1000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end_time]);

  return (
    <Stack
      spacing={1}
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems={{ md: 'center', xs: 'start' }}
      sx={{ mb: { xs: 3, md: 5 } }}
    >
      <Stack spacing={2} direction="row" alignItems="center">
        <IconButton component={RouterLink} href={paths.students.root}>
          <Iconify icon="eva:arrow-ios-back-fill" />
        </IconButton>

        <Stack spacing={0.5}>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="h4">{subject?.name}</Typography>
          </Stack>

          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            <Label
              variant="soft"
              color={
                (age_group?.max === 30 && 'success') ||
                (age_group?.max === 18 && 'warning') ||
                (age_group?.max === 15 && 'error') ||
                'default'
              }
            >
              {age_group?.name}
            </Label>
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        <TimerIcon />

        <Typography variant="h6" sx={{ marginLeft: 1 }}>
          {timeLeft.minutes.toString().padStart(2, '0')}:
          {timeLeft.seconds.toString().padStart(2, '0')}
        </Typography>
      </Stack>
    </Stack>
  );
}
