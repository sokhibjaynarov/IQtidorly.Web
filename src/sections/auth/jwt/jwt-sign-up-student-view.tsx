'use client';

import { z } from 'zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Box, Card } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { LogoMin } from 'src/components/logo/logo-min';
import { useUserAuthContext } from 'src/components/user-auth/use-user-auth-context';

import { otpEmailRequest, otpPhoneRequest } from 'src/auth/context/jwt';

import { isEmail, isPhoneNumber } from '../utils';

export type SignUpStudentSchemaType = z.infer<typeof SignUpStudentSchema>;

export const SignUpStudentSchema = z.object({
  fio: z.string().min(1, { message: 'First name is required!' }),
  contact: z
    .string()
    .min(1, { message: 'Contact is required!' })
    .refine(
      (value) => {
        if (isEmail(value)) {
          return z.string().email().safeParse(value).success;
        }
        return isPhoneNumber(value);
      },
      {
        message: 'Must be a valid email or phone number with at least 9 digits',
      }
    ),
  date_of_birth: z.union([z.string(), z.number()]),
  password: z
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});
const defaultValues = {
  fio: '',
  date_of_birth: undefined,
  contact: '',
  password: '',
};
export function JwtSignUpStudentView() {
  const { t } = useTranslation();
  const { setUserInfo } = useUserAuthContext();
  const router = useRouter();
  const password = useBoolean();
  const [errorMsg, setErrorMsg] = useState('');

  const methods = useForm<SignUpStudentSchemaType>({
    resolver: zodResolver(SignUpStudentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      let codeHash;
      if (isEmail(data.contact)) {
        codeHash = await otpEmailRequest(data.contact);
      } else {
        codeHash = await otpPhoneRequest(data.contact);
      }
      const userInfo = {
        role: 'student',
        auth_method: isEmail(data.contact) ? 'email' : 'phone',
        password: data.password,
        [isEmail(data.contact) ? 'email' : 'phone']: data.contact,
        fio: data.fio,
        date_of_birth: data.date_of_birth,
        code_hash: codeHash,
        occupation: {
          type: 'student',
        },
      };

      setUserInfo(userInfo);
      router.push(paths.auth.jwt.signOTP);
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : String(error));
    }
  });

  return (
    <Card sx={{ p: 3, width: { md: 450 } }}>
      <Stack spacing={1.5} sx={{ mb: 5, justifyContent: 'center', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 96,
            height: 96,
            borderRadius: '50%',
            background:
              'linear-gradient(135deg, rgba(0, 167, 111, 0) 0%, rgba(0, 167, 111, 0.16) 100%)',
          }}
        >
          <LogoMin disableLink width={56} height={56} />
        </Box>
        <Typography variant="h5">{t('signUp')}</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', textAlign: 'center', whiteSpace: 'pre-line' }}
          >
            {t('signUpForm')}
          </Typography>
        </Stack>
      </Stack>

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3} alignItems="center">
          <Stack spacing={1} direction="row">
            <Field.Text name="fio" label={t('fio')} />

            <Field.DatePicker name="date_of_birth" label={t('dob')} />
          </Stack>

          <Field.Text name="contact" label={t('emailOrPhone')} InputLabelProps={{ shrink: true }} />
          <Field.Text
            name="password"
            label={t('password')}
            placeholder="8+ characters"
            type={password.value ? 'text' : 'password'}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator={`${t('createAccount')}...`}
          >
            {t('createAccount')}
          </LoadingButton>
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('haveAccount')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
                {t('signIn')}
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Form>
    </Card>
  );
}
