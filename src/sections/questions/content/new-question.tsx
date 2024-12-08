'use client';

import Image from 'next/image';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function NewQuestionView() {
  const router = useRouter();
  return (
    <Container component={MotionContainer}>
      <Box
        component={m.div}
        variants={varBounce().in}
        sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}
      >
        <Box sx={{ maxWidth: 326, maxHeight: 326 }}>
          <Card
            sx={{
              textAlign: 'center',

              width: '100%',
              height: '100%',
            }}
          >
            <CardActionArea component="a" onClick={() => console.log('hi')}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Image
                    src="/assets/images/book-heat.png"
                    width={120}
                    height={120}
                    alt="use-existing-tests"
                  />
                </Box>
                <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
                  Testlar kutubxonasidan foydalanish
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                  Yangi testlar yaratish uchun “Yangi test qo’shish” tugmasini bosing
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
        <Box sx={{ maxWidth: 326, maxHeight: 326 }}>
          <Card
            sx={{
              textAlign: 'center',

              width: '100%',
              height: '100%',
            }}
          >
            <CardActionArea component="a" onClick={() => router.push(paths.dashboard.question)}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Image
                    src="/assets/images/clipped.png"
                    width={120}
                    height={120}
                    alt="create-new-test"
                  />
                </Box>
                <Typography variant="h6" sx={{ mt: 1, mb: 4.5 }}>
                  Yangi test yaratish
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                  Yangi test yaratish uchun “Yangi test qo’shish” tugmasini bosing
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
