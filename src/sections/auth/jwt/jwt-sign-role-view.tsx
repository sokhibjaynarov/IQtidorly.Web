'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Card, Typography, CardContent, CardActionArea } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Image } from 'src/components/image';

export function JwtSignRoleView() {
  const { t } = useTranslation();

  const router = useRouter();

  const roles = [
    {
      path: paths.auth.jwt.signUpStudent,
      image: '/assets/images/student.svg',
      bgColor: '#FFF5CC',
      title: 'student',
      subtitle: 'student',
    },
    {
      path: paths.auth.jwt.signUpTeacher,
      image: '/assets/images/teacher.svg',
      bgColor: '#C8FAD6',
      title: 'teacher',
      subtitle: 'teacher',
    },
  ];

  return (
    <>
      {roles.map((role, index) => (
        <Box key={index}>
          <Card
            sx={{
              width: { xs: 296, sm: 344, md: 220 },
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mx: 'auto',
            }}
          >
            <CardActionArea component="a" onClick={() => router.push(role.path)}>
              <CardContent
                sx={{
                  textAlign: { xs: 'left', md: 'center' },
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: { xs: 'row', md: 'column', lg: 'column' },
                  justifyContent: 'space-evenly',
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'left',
                    borderRadius: '50%',
                    background: role.bgColor,
                    mt: { md: 6 },
                    width: { xs: 60, sm: 80, md: 120 },
                    height: { xs: 60, sm: 80, md: 120 },
                  }}
                >
                  <Image src={role.image} alt="role" />
                </Box>

                <Typography variant="h4" sx={{ mt: { md: 2 } }}>
                  {t(`role.${role.title}`)}
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}
                  >
                    {t(`subtitle.${role.subtitle}`)}
                  </Typography>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      ))}
    </>
  );
}
