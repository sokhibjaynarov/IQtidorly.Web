'use client';

import { memo, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import Stack from '@mui/material/Stack';

import { RHFSelect } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const QuestionFilter = memo(({ subject, chapter, onFormChange, sx }: any) => {
  const { watch, setValue, getValues } = useFormContext();

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      onFormChange(value);
      if (name === 'subject') {
        setValue('chapter', null);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormChange, setValue]);

  return (
    <Stack spacing={3} direction={{ xs: 'column', sm: 'row' }} sx={sx}>
      <RHFSelect
        fullWidth
        name="subject"
        label="Barcha fanlar"
        PaperPropsSx={{ textTransform: 'capitalize' }}
        data={subject}
      />

      <RHFSelect
        fullWidth
        name="chapter"
        label="Barcha bolimlar"
        PaperPropsSx={{ textTransform: 'capitalize' }}
        disabled={!getValues('subject')}
        data={chapter}
      />
    </Stack>
  );
});

export default QuestionFilter;
