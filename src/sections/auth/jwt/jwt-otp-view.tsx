'use client';

import { z } from 'zod';
import OTPInput from 'react-otp-input';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Card, Button, useTheme } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { Form } from 'src/components/hook-form';
import { SvgColor } from 'src/components/svg-color';
import { LogoMin } from 'src/components/logo/logo-min';
import { useUserAuthContext } from 'src/components/user-auth/use-user-auth-context';

import { useAuthContext } from 'src/auth/hooks';
import { signUp, otpEmailRequest, otpPhoneRequest } from 'src/auth/context/jwt';

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const SignUpSchema = z.object({
  otp: z.string(),
});
const defaultValues = {
  otp: '',
};

export function JwtOtpView() {
  const { t } = useTranslation();
  const { userInfo, setUserInfo } = useUserAuthContext();
  const theme = useTheme();
  const { checkUserSession } = useAuthContext();
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        setCanResend(true);
        clearInterval(interval);
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onResentOtp = async () => {
    try {
      let codeHash;
      if (userInfo?.phone) {
        codeHash = await otpPhoneRequest(userInfo.phone);
      } else if (userInfo?.email) {
        codeHash = await otpEmailRequest(userInfo.email);
      } else {
        throw new Error('User contact information is missing.');
      }

      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo!,
        code_hash: codeHash,
      }));

      setTimer(60);
      setCanResend(false);
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const contactInfo = userInfo?.phone ? { phone: userInfo?.phone } : { email: userInfo?.email };
      const otpNumber = parseInt(otp, 10);

      await signUp({
        ...contactInfo,
        password: userInfo?.password || '',
        role: userInfo?.role || '',
        fio: userInfo?.fio || '',
        code: otpNumber,
        occupation: userInfo?.occupation || { type: 'student' },
        code_hash: userInfo?.code_hash || '',
        auth_method: userInfo?.auth_method || '',
        date_of_birth: userInfo?.date_of_birth || '',
      });

      await checkUserSession?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : String(error.message));
    }
  });

  const renderHead = (
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
      <Typography variant="h5">Ro’yxatdan o’tish</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          {t('otp')}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <SvgColor
          sx={{ color: '#00A76F' }}
          src="/assets/icons/components/ic-clock.svg"
          width={20}
          height={20}
        />
        <Typography variant="body2" sx={{ color: 'text.success', textAlign: 'center' }}>
          {formatTime(timer)}
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <Card sx={{ p: 3, mt: 5 }}>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3} alignItems="center">
          <OTPInput
            value={otp}
            onChange={(value) => {
              if (/^\d*$/.test(value)) {
                setOtp(value);
              }
            }}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            containerStyle={{
              justifyContent: 'center',
            }}
            shouldAutoFocus
            inputStyle={{
              fontSize: 24,
              borderRadius: 5,
              border: `2px solid ${errorMsg && theme.palette.error.main}`,
              margin: '0 8px',
              transition: 'border .2s ease',
            }}
          />

          {canResend && (
            <Button onClick={onResentOtp} variant="text" color="primary">
              {t('reSendSms')}
            </Button>
          )}

          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator={`${t('createAccount')}...`}
          >
            {t('send')}
          </LoadingButton>
        </Stack>
      </Form>
    </Card>
  );
}
