import { z } from 'zod';
import { useState, useEffect } from 'react';
import { MathfieldElement } from 'mathlive';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import {
  Card,
  Grid,
  Stack,
  Radio,
  Button,
  Divider,
  Typography,
  RadioGroup,
  CardContent,
  FormControlLabel,
} from '@mui/material';

import { useParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { getStorage } from 'src/hooks/use-local-storage';

import { useDiagnosticSubmition } from 'src/api/diagnostic/hooks/useDiagnosticSubmition';
import { useQuizSubmissionClose } from 'src/api/quiz-submission/hooks/useQuizSubmissionClose';

import { Image } from 'src/components/image';
import { Form, Field } from 'src/components/hook-form';
import { ConfirmDialog } from 'src/components/custom-dialog';

const SubmitionSchema = z.object({
  quiz: z.string(),
  submissions: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
      order: z.number(),
    })
  ),
});
type SubmitionSchemaType = z.infer<typeof SubmitionSchema>;

const lang = getStorage('i18nextLng');

const QuizCard = ({ quizess = { questions: [] } }: any) => {
  const { t } = useTranslation();
  const { id, attempId } = useParams();
  const confirm = useBoolean();

  const { diagnosticSubmission } = useDiagnosticSubmition(attempId as string);

  const { submissionClose } = useQuizSubmissionClose(attempId as string, id as string);

  const methods = useForm<SubmitionSchemaType>({
    defaultValues: {
      quiz: quizess?._id,
      submissions: quizess.questions.map((_: any, index: number) => ({
        question: '',
        answer: '',
        order: quizess.questions[index]?.difficulty || 0,
      })),
    },
  });
  MathfieldElement.fontsDirectory = '/fonts';
  const [question, setQuestion] = useState(0);
  const currentQuestion = quizess?.questions[question] || {};

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit((data) => {
    const filteredSubmissions = data.submissions.filter(
      (submission) =>
        submission.answer !== null && submission.answer !== undefined && submission.answer !== ''
    );
    const formattedData = {
      quiz: quizess?._id,
      submissions: filteredSubmissions.map((submission, index) => ({
        question: quizess.questions[index]?._id || '',
        answer: submission.answer,
        order: quizess.questions[index]?.difficulty,
      })),
    };

    if (formattedData?.submissions.length > 0) {
      diagnosticSubmission(formattedData);
    }
  });

  const handleSubmitChange = () => {
    onSubmit();
    submissionClose();
  };
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (quizess?.end_time) {
      const endTime = new Date(quizess?.end_time).getTime();
      const currentTime = new Date().getTime();
      const remainingTimeMillis = endTime - currentTime;

      const interval = setInterval(() => {
        const timeDiff = remainingTimeMillis - (new Date().getTime() - currentTime);

        if (timeDiff <= 0) {
          handleSubmitChange();
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizess?.end_time]);

  return (
    <Stack spacing={1} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2, px: { md: 20 } }}>
      <Card sx={{ width: { md: 750 } }}>
        <Typography variant="h6" gutterBottom sx={{ pt: 2, pl: 2 }}>
          {`${t('numQuestion')}№ ${question + 1}`}
        </Typography>
        <Form methods={methods} onSubmit={onSubmit}>
          <Typography variant="body1" mb={2} sx={{ pt: 1, pl: 4 }}>
            {currentQuestion?.[lang]?.content}
          </Typography>
          {currentQuestion?.[lang]?.media !== '' && (
            <Image src={`${process.env.NEXT_PUBLIC_FILE_URL}${currentQuestion?.[lang]?.media}`} />
          )}

          <Divider />
          {currentQuestion?.type === 'multiple_choice' ? (
            <>
              {currentQuestion?.[lang].answers?.map((answer: any, index: number) => (
                <Controller
                  key={`answer-${question}-${index}`}
                  name={`submissions.${question}.answer`}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} sx={{ pt: 1, pl: 4 }}>
                      <FormControlLabel
                        key={`answer-${question}-${index}`}
                        value={answer.text}
                        control={<Radio />}
                        label={answer.text}
                        checked={field.value === answer.text}
                        onChange={() => field.onChange(answer.text)}
                      />
                    </RadioGroup>
                  )}
                />
              ))}
            </>
          ) : currentQuestion?.type === 'input' ? (
            <Stack m={4}>
              <Field.Latex
                key={question}
                name={`submissions.${question}.answer`}
                variant="outlined"
                placeholder={t('answer')}
                sx={{ pt: 1, pl: 4, mb: 2 }}
                multiline
              />
            </Stack>
          ) : null}

          <Divider />
          <Stack direction="row" justifyContent="space-between" mt={2} p={3}>
            <Button
              variant="contained"
              onClick={() => setQuestion((prev) => Math.max(prev - 1, 0))}
              disabled={question === 0}
            >
              {t('prevQuestion')}
            </Button>
            <ConfirmDialog
              open={confirm.value}
              onClose={confirm.onFalse}
              title="Submit"
              content={<>{t('submitQuizContent')}</>}
              action={
                <LoadingButton
                  type="submit"
                  color="success"
                  variant="contained"
                  onClick={handleSubmitChange}
                  loading={isSubmitting}
                  loadingIndicator={`${t('send')}...`}
                >
                  {t('send')}
                </LoadingButton>
              }
            />

            {question === (quizess?.questions.length || 0) - 1 ? (
              <Button color="success" variant="contained" onClick={confirm.onTrue}>
                {t('send')}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  onSubmit();
                  setQuestion((prev) => Math.min(prev + 1, (quizess?.questions.length || 0) - 1));
                }}
                disabled={question === (quizess?.questions.length || 0) - 1}
              >
                {t('nextQuestion')}
              </Button>
            )}
          </Stack>
        </Form>
      </Card>
      <Card sx={{ width: { lg: 464, xs: 341 }, height: '50%' }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            {`${t('allQuestion')}`} ({question + 1}/{quizess?.questions.length || 0})
          </Typography>
          <Grid container>
            {quizess?.questions.map((_: any, index: number) => (
              <Grid item lg={2} xs={3} key={index}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    onSubmit();
                    setQuestion(index);
                  }}
                  sx={{
                    borderRadius: '50%',
                    minWidth: 32,
                    minHeight: 32,
                    padding: 0,
                    margin: 0.8,
                    borderColor: index === question ? '#5BE49B' : 'grey.400',
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    bgcolor: 'grey.100',
                    color: index === question ? '#00A76F' : 'grey.400',
                  }}
                >
                  {index + 1}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default QuizCard;
