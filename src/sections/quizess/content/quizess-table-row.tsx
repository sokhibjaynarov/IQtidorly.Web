import type { GridCellParams } from '@mui/x-data-grid';
import type { Language } from 'src/sections/questions/content/create-test';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Typography, ListItemText } from '@mui/material';

import { fTime, fDate } from 'src/utils/format-time';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

type ParamsProps = {
  params: GridCellParams;
};

export function RenderCellName({ params }: ParamsProps) {
  const { row } = params;

  const languages = ['uz', 'ru', 'en', 'qr'];

  const firstContent = languages.reduce((acc, lang) => acc || row?.[lang]?.title, null);
  const firstImage = languages.reduce((acc, lang) => acc || row?.[lang]?.image, null);

  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <Avatar
        alt={row.title}
        src={`https://iqtidorli.glmv.dev${firstImage}`}
        variant="rounded"
        sx={{ width: 74, height: 74, mr: 2 }}
      />

      <ListItemText
        disableTypography
        primary={<Typography variant="subtitle1">{firstContent || row.title}</Typography>}
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </Stack>
  );
}

export function RenderCellLanguage({ params }: ParamsProps) {
  const languageNames = {
    en: 'Ingiliz',
    ru: 'Rus',
    uz: "O'zbek",
    qr: 'Qoraqalpoq',
  };

  const selectedLanguage = Object.keys(languageNames).find((lang) =>
    Object.prototype.hasOwnProperty.call(params.row, lang)
  );

  if (selectedLanguage && languageNames[selectedLanguage as Language]) {
    return languageNames[selectedLanguage as Language];
  }
}

export function RenderCellSubject({ params }: ParamsProps) {
  return (
    <Stack spacing={0.5}>
      <Box component="span">{params.row.subject?.name}</Box>
    </Stack>
  );
}
export function RenderCellDuration({ params }: ParamsProps) {
  return (
    <Stack spacing={0.5}>
      <Box component="span">{`${params.row.duration} min`}</Box>
    </Stack>
  );
}
export function RenderCellAgeGroup({ params }: ParamsProps) {
  return (
    <Stack spacing={0.5}>
      <Box component="span">{params.row.age_group?.name}</Box>
    </Stack>
  );
}

export function RenderCellStartTime({ params }: ParamsProps) {
  return (
    <Stack spacing={0.5}>
      <Box component="span">{fDate(params.row.start_time)}</Box>
      <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
        {fTime(params.row.createdAt)}
      </Box>
    </Stack>
  );
}

export function RenderCellClasses({ params }: ParamsProps) {
  return (
    <Label variant="soft" color={(params.row.difficulty === 'easy' && 'info') || 'default'}>
      {params.row.difficulty}
    </Label>
  );
}
