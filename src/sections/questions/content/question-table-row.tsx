'use client';

import type { GridCellParams } from '@mui/x-data-grid';

import { MathfieldElement } from 'mathlive';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { fTime, fDate } from 'src/utils/format-time';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

type ParamsProps = {
  params: GridCellParams;
};

export function RenderCellName({ params }: ParamsProps) {
  MathfieldElement.fontsDirectory = '/fonts';
  const { row } = params;

  return (
    <p>
      {`
        ${row?.uz?.content || row?.ru?.content || row?.en?.content}
        `}
    </p>
  );
}

export function RenderCellType({ params }: ParamsProps) {
  return (
    <Label
      variant="soft"
      color={
        (params.row.type === 'multiple_choice' && 'primary') ||
        (params.row.type === 'input' && 'secondary') ||
        'default'
      }
    >
      {(params?.row?.type === 'multiple_choice' && 'Yagona tanlov') ||
        (params?.row?.type === 'input' && 'Ochiq Test')}
    </Label>
  );
}

export function RenderCellSubject({ params }: ParamsProps) {
  return (
    <Stack spacing={0.5}>
      <Box component="span">{params?.row?.subject?.name}</Box>
    </Stack>
  );
}
export function RenderCellAgeGroup({ params }: ParamsProps) {
  return (
    <Stack spacing={0.5}>
      <Box component="span">{params?.row?.age_group?.name}</Box>
    </Stack>
  );
}
export function RenderCellChapter({ params }: ParamsProps) {
  return (
    <Stack spacing={0.5}>
      <Box component="span">{params?.row?.chapter?.name}</Box>
    </Stack>
  );
}
export function RenderCellCreatedAt({ params }: ParamsProps) {
  return (
    <Stack spacing={0.5}>
      <Box component="span">{fDate(params?.row?.created_at, 'DD.MM.YYYY')}</Box>
      <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
        {fTime(params?.row?.createdAt)}
      </Box>
    </Stack>
  );
}

export function RenderCellDifficulty({ params }: ParamsProps) {
  return (
    <Label
      variant="soft"
      color={
        (params.row.difficulty === 1 && 'info') ||
        (params.row.difficulty === 2 && 'info') ||
        (params.row.difficulty === 3 && 'info') ||
        (params.row.difficulty === 4 && 'success') ||
        (params.row.difficulty === 5 && 'success') ||
        (params.row.difficulty === 6 && 'success') ||
        (params.row.difficulty === 7 && 'warning') ||
        (params.row.difficulty === 8 && 'warning') ||
        (params.row.difficulty === 9 && 'warning') ||
        (params.row.difficulty === 10 && 'error') ||
        'default'
      }
    >
      {params?.row?.difficulty}
    </Label>
  );
}
