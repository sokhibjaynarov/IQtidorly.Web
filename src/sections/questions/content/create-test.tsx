'use client';

import type { LanguageQuestion } from 'src/api/question/type';

import { z as zod } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useCallback } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Tab,
  List,
  Card,
  Tabs,
  Stack,
  Radio,
  Button,
  MenuItem,
  Container,
  Typography,
  RadioGroup,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import useFileUploader from 'src/utils/file-uploader';

import { useGetSubjects } from 'src/api/subjects/hooks/useGetSubjects';
import { useGetAgeGroup } from 'src/api/age-group/hooks/useGetAgeGroup';
import { useEditQuestion } from 'src/api/question/hooks/useEditQuestion';
import { useGetChapterList } from 'src/api/chapters/hooks/getChapterList';
import { useCreateQuestion } from 'src/api/question/hooks/useCreateQuestion';

import { toast } from 'src/components/snackbar';
import { RHFSelect } from 'src/components/hook-form/rhf-select';
import { Form, Field, RHFTextField } from 'src/components/hook-form';

import QuestionFilter from 'src/sections/filter/question-filter';

export type Language = 'uz' | 'en' | 'qr' | 'ru';

// const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const languageObject = zod.object({
  content: zod.string().optional(),
  media: zod
    .union([zod.custom<File>((file) => file instanceof File), zod.string().optional()])
    .optional(),
  answers: zod.array(
    zod.object({
      id: zod.string(),
      value: zod.string(),
    })
  ),
  correctAnswerId: zod.string().optional(),
  correctAnswers: zod.string().optional(),
});

export const NewQuestionSchema = zod
  .object({
    subject: zod.string().min(1, { message: 'Product code is required!' }),
    type: zod.string().min(1, { message: 'Product sku is required!' }),
    difficulty: zod.number().min(1, { message: 'difficulty is req' }),
    age_group: zod.string(),
    chapter: zod.any().optional(),
    selectedLanguage: zod.string().optional(),
    ru: languageObject.optional(),
    en: languageObject.optional(),
    uz: languageObject.optional(),
    qr: languageObject.optional(),
  })
  .refine((data) => data.ru?.content || data.en?.content || data.uz?.content || data.qr?.content, {
    message: 'At least one language content is required!',
    path: ['ru', 'en', 'uz', 'qr'],
  });

export type NewQuestionSchemaType = zod.infer<typeof NewQuestionSchema>;

export default function CreateTestView({ currentQuestion }: any) {
  const defaultValues = useMemo(
    () => ({
      subject: currentQuestion?.subject,
      type: currentQuestion?.type,
      chapter: currentQuestion?.chapter,
      age_group: currentQuestion?.age_group,
      difficulty: currentQuestion?.difficulty,
      ru: {
        media:
          (currentQuestion?.ru?.media !== '' || currentQuestion?.ru?.media !== undefined) &&
          currentQuestion
            ? `https://iqtidorli.glmv.dev${currentQuestion?.ru?.media}`
            : '',
        content: currentQuestion?.ru?.content,
        answers: currentQuestion?.ru?.answers.map((answer: any) => ({
          id: uuidv4(),
          value: answer.text,
        })) || [
          { id: uuidv4(), value: '' },
          { id: uuidv4(), value: '' },
          { id: uuidv4(), value: '' },
          { id: uuidv4(), value: '' },
        ],
        correctAnswerId: undefined,
      },
      uz: {
        media:
          (currentQuestion?.uz?.media !== '' || currentQuestion?.uz?.media !== undefined) &&
          currentQuestion
            ? `https://iqtidorli.glmv.dev${currentQuestion?.uz?.media}`
            : '',
        content: currentQuestion?.uz?.content,
        answers: currentQuestion?.uz?.answers.map((answer: any) => ({
          id: uuidv4(),
          value: answer.text,
        })) || [
          { id: uuidv4(), value: '' },
          { id: uuidv4(), value: '' },
          { id: uuidv4(), value: '' },
          { id: uuidv4(), value: '' },
        ],
        correctAnswerId: undefined,
      },
      en: {
        media:
          (currentQuestion?.en?.media !== '' || currentQuestion?.en?.media !== undefined) &&
          currentQuestion
            ? `https://iqtidorli.glmv.dev${currentQuestion?.en?.media}`
            : '',
        content: currentQuestion?.en?.content,
        answers: currentQuestion?.en?.answers.map((answer: any) => ({
          id: uuidv4(),
          value: answer.text,
        })) || [
          { id: uuidv4(), value: '' },
          { id: uuidv4(), value: '' },
          { id: uuidv4(), value: '' },
          { id: uuidv4(), value: '' },
        ],
        correctAnswerId: undefined,
      },
      qr: {
        media:
          (currentQuestion?.qr?.media !== '' || currentQuestion?.qr?.media !== undefined) &&
          currentQuestion
            ? `https://iqtidorli.glmv.dev${currentQuestion?.qr?.media}`
            : '',
        content: currentQuestion?.qr?.content,
        answers: currentQuestion?.qr?.answers.map((answer: any) => ({
          id: uuidv4(),
          value: answer.text,
        })) || [
          { id: uuidv4(), value: '' },
          { id: uuidv4(), value: '' },
          { id: uuidv4(), value: '' },
          { id: uuidv4(), value: '' },
        ],
        correctAnswerId: undefined,
      },

      selectedLanguage: 'uz',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentQuestion]
  );

  const methods = useForm<NewQuestionSchemaType>({
    resolver: zodResolver(NewQuestionSchema),
    defaultValues,
  });

  const [subjectCode, setSubjectCode] = useState<string | undefined>(undefined);

  const { uploadFile } = useFileUploader();
  const { data: chapterList } = useGetChapterList(subjectCode!);
  const { data: subjectList } = useGetSubjects();
  const { data: ageGroupList } = useGetAgeGroup();
  const { questionCreate, isPending: isCreatePendig } = useCreateQuestion();
  const { questionEdit, isPending: isEditPending } = useEditQuestion(currentQuestion?._id);

  const { handleSubmit, getValues, setValue, control } = methods;
  const selectedLanguage = useWatch({ control, name: 'selectedLanguage' });

  const handleFormChange = () => {
    const subject_code = getValues('subject');
    setSubjectCode(subject_code);
  };

  const transformAnswers = (answers: any[], correctAnswerId: any) =>
    answers?.map((option: any) => ({
      text: option.value,
      is_correct: option.id === correctAnswerId,
    }));
  const correctAnswer = (answers: any[], correctAnswerId: any) => ({
    text: answers.find((option: any) => option.id === correctAnswerId)?.value,
    is_correct: true,
  });

  const filterLanguages = async (formValues: any) => {
    const languages = ['ru', 'en', 'uz', 'qr'];
    const filteredValues: any = {};

    await Promise.all(
      languages.map(async (lang) => {
        if (formValues[lang]?.content) {
          let mediaUrl: string = '';
          if (formValues[lang].media instanceof File) {
            const uploaded = await uploadFile<LanguageQuestion>(formValues[lang]!, `media`);
            mediaUrl = uploaded.media! as string;
          }
          if (methods.getValues('type') === 'multiple_choice') {
            filteredValues[lang] = {
              ...formValues[lang],
              answers: transformAnswers(
                formValues[lang]?.answers,
                formValues[lang]?.correctAnswerId
              ),
              correct_answer: correctAnswer(
                formValues[lang]?.answers,
                formValues[lang]?.correctAnswerId
              ),
              media: mediaUrl,
            };
          }
          if (methods.getValues('type') === 'input') {
            filteredValues[lang] = {
              ...formValues[lang],
              answers: [{ text: formValues[lang]?.correctAnswers, is_correct: true }],
              correct_answer: { text: formValues[lang]?.correctAnswers, is_correct: true },
              media: mediaUrl,
            };
          }
          delete filteredValues[lang]?.correctAnswerId;
          delete filteredValues[lang]?.correctAnswers;
        }
      })
    );

    return filteredValues;
  };

  const onSubmit = handleSubmit(async (formValues) => {
    const filteredValues = await filterLanguages(formValues);

    if (!formValues.en?.content) {
      delete formValues.en;
    }
    if (!formValues.uz?.content) {
      delete formValues.uz;
    }
    if (!formValues.qr?.content) {
      delete formValues.qr;
    }
    if (!formValues.ru?.content) {
      delete formValues.ru;
    }

    delete formValues.selectedLanguage;

    try {
      if (currentQuestion) {
        questionEdit({
          ...formValues,
          ...filteredValues,
        });
      } else {
        questionCreate({
          ...formValues,
          ...filteredValues,
        });
      }
    } catch (error) {
      toast.error(error);
    }
  });
  const handleRemoveFile = useCallback(() => {
    setValue(`${selectedLanguage as Language}.media`, '');
  }, [selectedLanguage, setValue]);

  return (
    <Container maxWidth="xl">
      <Form methods={methods} onSubmit={onSubmit}>
        <Box display="flex" flexDirection="column" p={2} m={2}>
          <Card sx={{ display: 'flex', p: 2, ml: 3, flexDirection: 'column', flex: 3 }}>
            <Stack direction="row" display="flex" justifyContent="space-between">
              <Typography variant="h6">Savol</Typography>
              <Stack direction="row">
                <Button
                  variant="outlined"
                  sx={{ mr: 2 }}
                  component={RouterLink}
                  href={paths.dashboard.two}
                >
                  Ortga
                </Button>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  loading={currentQuestion ? isEditPending : isCreatePendig}
                >
                  {currentQuestion ? `Tahrirlash` : `Saqlash`}
                </LoadingButton>
              </Stack>
            </Stack>

            <QuestionFilter
              subject={subjectList}
              chapter={chapterList}
              onFormChange={handleFormChange}
              sx={{ mt: 3 }}
            />

            <Stack direction="row" spacing={2}>
              <Field.Text
                fullWidth
                label="Savol turi"
                select
                name="type"
                variant="outlined"
                sx={{ mb: 2, mt: 2 }}
              >
                <MenuItem value="multiple_choice">Yagona tanlovi</MenuItem>
                <MenuItem value="input">Ochiq test</MenuItem>
              </Field.Text>
              <RHFSelect
                name="age_group"
                data={ageGroupList}
                label="Yosh chegarasi"
                sx={{ mb: 2, mt: 2 }}
              />
              <RHFTextField
                type="number"
                name="difficulty"
                sx={{ mb: 2, mt: 2 }}
                label="Savol tartibi"
              />
            </Stack>
          </Card>
          <Box sx={{ ml: 5 }}>
            <Tabs
              value={selectedLanguage}
              onChange={(e, newValue) => setValue('selectedLanguage', newValue)}
              sx={{
                '& .MuiTabs-indicator': {
                  bottom: '2px',
                },
              }}
            >
              <Tab label="O'zbek tili" value="uz" />
              <Tab label="Qoraqalpoq tili" value="qr" />
              <Tab label="Rus tili" value="ru" />
              <Tab label="Ingiliz tili" value="en" />
            </Tabs>
          </Box>

          <Card
            key={selectedLanguage}
            sx={{ display: 'flex', p: 2, ml: 3, mt: 1, flexDirection: 'column', flex: 3 }}
          >
            <Stack spacing={0.5} mb={1}>
              <Typography variant="subtitle2">Masalani kiriting</Typography>
              <Field.Text
                fullWidth
                name={`${selectedLanguage}.content`}
                label="Masalani yozing"
                variant="outlined"
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Rasm yuklang</Typography>
              <Field.Upload
                multiple
                thumbnail
                key={selectedLanguage}
                name={`${selectedLanguage}.media`}
                onDelete={handleRemoveFile}
                onUpload={() => console.info('ON UPLOAD')}
              />
            </Stack>

            <List>
              {methods.watch('type') === 'input' ? (
                <Stack spacing={0.5} mb={1}>
                  <Typography variant="subtitle2">Masalani Javobini kiriting</Typography>
                  <RHFTextField
                    name={`${selectedLanguage}.correctAnswers`}
                    style={{ paddingBottom: 10 }}
                  />
                </Stack>
              ) : (
                <RadioGroup
                  value={methods.watch(`${selectedLanguage as Language}.correctAnswerId`)}
                  onChange={(e) =>
                    setValue(`${selectedLanguage as Language}.correctAnswerId`, e.target.value)
                  }
                >
                  {methods
                    .watch(`${selectedLanguage as Language}.answers`)
                    ?.map((option, index) => (
                      <Stack direction="row" spacing={1} mb={2} mt={2}>
                        <Radio value={option.id} />
                        <RHFTextField
                          fullWidth
                          name={`${selectedLanguage as Language}.answers.${index}.value`}
                          variant="outlined"
                          style={{ width: '100%' }}
                        />
                      </Stack>
                    ))}
                </RadioGroup>
              )}
            </List>
          </Card>
        </Box>
      </Form>
    </Container>
  );
}
