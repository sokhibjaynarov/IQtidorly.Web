import type { GridCellParams } from '@mui/x-data-grid';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';
import { formatPhoneNumber } from 'src/utils/format-number';

import { Label } from 'src/components/label';

import { gender, occupation, genderColor, occupationColor } from '../constants';

// ----------------------------------------------------------------------

type ParamsProps = {
  params: GridCellParams;
};

export function RenderCellName({ params }: ParamsProps) {
  return params.row?.fio;
}

export function RenderCellPhone({ params }: ParamsProps) {
  return formatPhoneNumber(params.row?.phone);
}

export function RenderCellDateOfBirth({ params }: ParamsProps) {
  return (
    <Stack spacing={0.1}>
      <Box component="span">{fDate(params.row.date_of_birth, 'DD.MM.YYYY')}</Box>
    </Stack>
  );
}
export function RenderCellAddress({ params }: ParamsProps) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Box
          component="div"
          sx={{ typography: 'body2' }}
        >{`${params.row?.address?.region}, ${params.row?.address?.district},`}</Box>
      }
      secondary={
        <Box
          component="div"
          sx={{ typography: 'body2' }}
        >{`${params.row?.address?.neighborhood}`}</Box>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}
export function RenderCellSchooleAddress({ params }: ParamsProps) {
  return (
    <Label variant="soft" color={occupationColor[params.row.occupation?.type || '']}>
      {occupation[params.row.occupation?.type!]}
    </Label>
  );
}

export function RenderCellGender({ params }: ParamsProps) {
  return (
    <Label variant="soft" color={genderColor[params.row.gender || '']}>
      {gender[params.row.gender]}
    </Label>
  );
}
