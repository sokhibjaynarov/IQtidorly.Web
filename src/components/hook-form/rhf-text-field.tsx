import type { TextFieldProps } from '@mui/material/TextField';

import { MathfieldElement } from 'mathlive';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<
        React.HTMLAttributes<MathfieldElement>,
        MathfieldElement
      > & {
        onInput?: (event: React.FormEvent<MathfieldElement>) => void;
      };
    }
  }
}

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
};

export function RHFTextField({ name, helperText, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error?.message ?? helperText}
          inputProps={{
            autoComplete: 'off',
          }}
          {...other}
        />
      )}
    />
  );
}

export function RHFLatexField({ name, helperText, type, ...other }: Props) {
  const mf = new MathfieldElement();
  MathfieldElement.soundsDirectory = '/sound';
  MathfieldElement.fontsDirectory = '/fonts';
  mf.mathModeSpace = '!';

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <math-field
          {...field}
          {...other}
          fullWidth
          type={type}
          value={field.value}
          // @ts-ignore
          onInput={(event) => {
            const target = event.target as MathfieldElement;
            field.onChange(target.value);
          }}
          error={!!error}
          helperText={error?.message ?? helperText}
          inputProps={{
            autoComplete: 'off',
          }}
          {...other}
        />
      )}
    />
  );
}
