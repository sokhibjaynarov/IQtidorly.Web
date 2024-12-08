'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { getStorage } from 'src/hooks/use-local-storage';

import { fDate } from 'src/utils/format-time';

import { SeoIllustration } from 'src/assets/illustrations';
import { useGetQuiz } from 'src/api/quizess/hooks/useGetQuiz';
import { useRegisterForQuiz } from 'src/api/quizess/hooks/useRegistretQuiz';
import { usePostDiagnosticStart } from 'src/api/diagnostic/hooks/usePostDiagnosticStart';

import AboutSection from './component/about';
import QuestionsCard from './component/question-card';
import HowToApplySection from './component/how-to-apply';
import CertificateSection from './component/certificate';
import SubscriptionFormSection from '../landing/landing-reg-quiz/landing-reg-quiz-view';

// ----------------------------------------------------------------------

export default function DescriptionView() {
  const lang = getStorage('i18nextLng');
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useParams();
  const { diagnosticStart } = usePostDiagnosticStart();
  const { data: quiz } = useGetQuiz(id as string);
  const { quizesReg } = useRegisterForQuiz();
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [startTime, setStartTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isEnd, setIsEnd] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isRegOver, setIsRegOver] = useState(false);
  function isEndTimeReached(endTime: Date) {
    const currentTime = new Date();
    const endTimeDate = new Date(endTime);

    return setIsEnd(currentTime >= endTimeDate);
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (quiz?.registration.end_time) {
      const endTime = new Date(quiz.registration.end_time).getTime();

      const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDiff = endTime - currentTime;

        if (timeDiff <= 0) {
          clearInterval(interval);
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
          setIsRegOver(true);
        } else {
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          setTimeLeft({ hours, minutes, seconds });
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [quiz?.registration.end_time]);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if ((quiz?.start_time, quiz?.end_time)) {
      const endTime = new Date(quiz?.start_time).getTime();

      const interval = setInterval(() => {
        isEndTimeReached(quiz?.end_time);
        const currentTime = new Date().getTime();
        const timeDiff = endTime - currentTime;

        if (timeDiff <= 0) {
          clearInterval(interval);
          setStartTime({ hours: 0, minutes: 0, seconds: 0 });
          setIsStart(true);
        } else {
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          setStartTime({ hours, minutes, seconds });
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [quiz?.start_time, quiz?.end_time]);

  const handleDiagnostic = async () => {
    let responseData;
    try {
      if (!quiz?.is_registered) {
        quizesReg(id as string);
      }
      if (quiz?.is_registered) {
        responseData = await diagnosticStart({ language: lang, quiz: id as string });
      }

      if (isStart && quiz?.is_registered) {
        router.push(paths.students.diagnostic(id! as string, responseData?._id! as string));
      }
    } catch (error) {
      console.error('Diagnostic Start Error:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid xs={12} sx={{ mb: 3, mt: 3 }}>
        <Container maxWidth="xl">
          <QuestionsCard
            title={quiz?.[lang]?.title}
            description={quiz?.[lang]?.description}
            img={<SeoIllustration />}
            grade={quiz?.age_group?.name}
            date={fDate(quiz?.start_time)!}
            startTime={!quiz?.is_registered ? timeLeft : startTime}
            action={
              isEnd ? (
                <> {t('quizOver')}</>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDiagnostic}
                  disabled={!quiz?.is_registered ? isRegOver : !isStart}
                >
                  {quiz?.is_registered ? `${t('start')}` : `${t('registr')}`}
                </Button>
              )
            }
          />
        </Container>
      </Grid>
      <Grid xs={12} sx={{ mb: 10 }}>
        <Container maxWidth="xl">
          <HowToApplySection />
        </Container>
      </Grid>
      <Grid xs={12} sx={{ mb: 10 }}>
        <Container maxWidth="xl">
          <AboutSection />
        </Container>
      </Grid>
      <Grid xs={12} sx={{ mb: 10 }}>
        <Container maxWidth="xl">
          <CertificateSection />
        </Container>
      </Grid>
      <Grid xs={12} sx={{ mb: 10 }}>
        <Box
          sx={{
            bgcolor: '#fff',
            pt: 2,
            pb: 6,
            backgroundImage: 'url(/assets/sunglass.png), url(/assets/book3.png)',
            backgroundPosition: 'right top, top 75% left 50%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Container maxWidth="xl">
            <SubscriptionFormSection />
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
}
