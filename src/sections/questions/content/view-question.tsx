'use client';

import React from 'react';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import { Stack, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { useGetEditQuestions } from 'src/api/question/hooks/useGetQuestionEdit';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  id: string;
};

export function ViewQuestion({ id, open, onClose }: Props) {
  const { data: questionGet } = useGetEditQuestions(id);

  console.log(questionGet);

  return (
    <Dialog fullWidth open={open} onClose={onClose} PaperProps={{ sx: { maxWidth: 624 } }}>
      <DialogTitle>Savol</DialogTitle>

      <DialogContent>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <>
            <Stack spacing={1.5} border={0.5} borderRadius={1}>
              <Typography variant="subtitle1" p={1}>
                UZ:
              </Typography>
              <Typography m={1} variant="subtitle2">
                {questionGet?.uz?.content}
              </Typography>
              <Typography m={1} variant="subtitle2">
                {`Javoblar: ${questionGet?.uz?.answers.map((item: any) => `${item.text} `)}`}
              </Typography>
            </Stack>
            <Stack spacing={1.5} border={0.5} borderRadius={1}>
              <Typography variant="subtitle1" p={1}>
                RU:
              </Typography>
              <Typography m={1} variant="subtitle2">
                {questionGet?.ru?.content}
              </Typography>
              <Typography m={1} variant="subtitle2">
                {`Javoblar: ${questionGet?.ru?.answers.map((item: any) => `${item.text} `)}`}
              </Typography>
            </Stack>
            <Stack spacing={1.5} border={0.5} borderRadius={1} mb={2}>
              <Typography variant="subtitle1" p={1}>
                EN:
              </Typography>
              <Typography m={1} variant="subtitle2">
                {questionGet?.en?.content}
              </Typography>
              <Typography m={1} variant="subtitle2">
                {`Javoblar: ${questionGet?.en?.answers.map((item: any) => `${item.text} `)}`}
              </Typography>
            </Stack>
            <Stack spacing={1.5} border={0.5} borderRadius={1} mb={2}>
              <Typography variant="subtitle1" p={1}>
                QR:
              </Typography>
              <Typography m={1} variant="subtitle2">
                {questionGet?.qr?.content}
              </Typography>
              <Typography m={1} variant="subtitle2">
                {`Javoblar: ${questionGet?.qr?.answers.map((item: any) => `${item.text} `)}`}
              </Typography>
            </Stack>
          </>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
