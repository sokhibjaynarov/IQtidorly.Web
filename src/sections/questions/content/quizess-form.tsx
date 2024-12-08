import type { QuizessLanguage } from 'src/api/quizess/type';
import type { GridRowSelectionModel } from '@mui/x-data-grid';

import { z as zod } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import React, { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Tab, Tabs, Stack, Typography } from '@mui/material';

import useFileUploader from 'src/utils/file-uploader';

import { useGetSubjects } from 'src/api/subjects/hooks/useGetSubjects';
import { useGetAgeGroup } from 'src/api/age-group/hooks/useGetAgeGroup';
import { useCreateQuizess } from 'src/api/quizess/hooks/useCreateQuizess';

import { Form, Field, RHFSelect } from 'src/components/hook-form';

import type { Language } from './create-test';

// ----------------------------------------------------------------------

export type UserQuickEditSchemaType = zod.infer<typeof UserQuickEditSchema>;

const descriptionShcema = zod.object({
  title: zod.string().optional(),
  image: zod
    .union([zod.custom<File>((file) => file instanceof File), zod.string().optional()])
    .optional(),
  description: zod.string().optional(),
});

export const UserQuickEditSchema = zod
  .object({
    start_time: zod.union([zod.string(), zod.number()]),
    end_time: zod.union([zod.string(), zod.number()]),
    registration: zod.object({
      start_time: zod.union([zod.string(), zod.number()]),
      end_time: zod.union([zod.string(), zod.number()]),
    }),

    age_group: zod.string().min(1, { message: 'required!' }),
    subject: zod.string().min(1, { message: 'Zip code is required!' }),
    type: zod.string().min(1, { message: 'Zip code is required!' }),
    selectedLanguage: zod.string().optional(),
    uz: descriptionShcema.optional(),
    ru: descriptionShcema.optional(),
    en: descriptionShcema.optional(),
    qr: descriptionShcema.optional(),
  })
  .refine((data) => data.ru?.title || data.en?.title || data.uz?.title || data.qr?.title, {
    message: 'At least one language content is required!',
    path: ['ru', 'en', 'uz', 'qr'],
  });

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  selectedQuizess: GridRowSelectionModel;
};

export function QuizessForm({ selectedQuizess, open, onClose }: Props) {
  const { uploadFile } = useFileUploader();
  const methods = useForm<UserQuickEditSchemaType>({
    defaultValues: { selectedLanguage: 'uz' },
    mode: 'all',
    resolver: zodResolver(UserQuickEditSchema),
  });

  const { reset, handleSubmit, setValue, control } = methods;
  const { quizessCreate, isPending } = useCreateQuizess(onClose);
  const { data: subjectList } = useGetSubjects();
  const { data: ageGroupList } = useGetAgeGroup();
  const [step, setStep] = useState(1);
  const selectedLanguage = useWatch({ control, name: 'selectedLanguage' });
  const filterLanguages = async (formValues: any) => {
    const languages = ['ru', 'en', 'uz', 'qr'];
    const filteredValues: any = {};

    await Promise.all(
      languages.map(async (lang) => {
        if (formValues[lang]?.title) {
          let mediaUrl: string = '';
          if (formValues[lang].image instanceof File) {
            const uploaded = await uploadFile<QuizessLanguage>(formValues[lang]!, `image`);
            console.log(uploaded);

            mediaUrl = uploaded.image! as string;
          }
          filteredValues[lang] = {
            ...formValues[lang],
            image: mediaUrl,
          };
        }
      })
    );

    return filteredValues;
  };
  const handleRemoveFile = useCallback(() => {
    setValue(`${selectedLanguage as Language}.image`, '');
  }, [selectedLanguage, setValue]);
  const onSubmit = async (formValues: UserQuickEditSchemaType) => {
    reset();
    setStep(1);
    const transformetData = await filterLanguages(formValues);

    quizessCreate({
      age_group: formValues.age_group,
      start_time: formValues.start_time,
      end_time: formValues.end_time,
      subject: formValues.subject,
      questions: selectedQuizess,
      ...transformetData,
      type: formValues?.type,
      is_public: true,
      registration: {
        start_time: formValues.registration.start_time,
        end_time: formValues.registration.end_time,
      },
    });
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose} PaperProps={{ sx: { maxWidth: 624 } }}>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Olimpiada </DialogTitle>

        <DialogContent>
          <Box rowGap={3} columnGap={2} display="grid">
            {step === 1 && (
              <>
                <Tabs
                  value={selectedLanguage}
                  onChange={(e, newValue) => setValue('selectedLanguage', newValue)}
                >
                  <Tab label="UZ" value="uz" defaultChecked />
                  <Tab label="QR" value="qr" />
                  <Tab label="RU" value="ru" />
                  <Tab label="EN" value="en" />
                </Tabs>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Olimpiada sarlavhasi</Typography>
                  <Field.Text
                    key={selectedLanguage}
                    size="small"
                    name={`${selectedLanguage}.title`}
                  />
                </Stack>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Test turi</Typography>
                  <RHFSelect
                    hiddenLabel
                    size="small"
                    name="type"
                    data={[
                      { _id: 'olympiad', name: 'Olympiada' },
                      { _id: 'diagnostic', name: 'Diagnostik' },
                    ]}
                  />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Fani tanlang</Typography>
                  <RHFSelect hiddenLabel size="small" name="subject" data={subjectList} />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Olimpiada haqida batafsil</Typography>
                  <Field.Text
                    key={selectedLanguage}
                    size="small"
                    fullWidth
                    name={`${selectedLanguage}.description`}
                    label="Olimpiada haqida batafsil yozing"
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                </Stack>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Rasm yuklang</Typography>
                  <Field.Upload
                    key={selectedLanguage}
                    thumbnail
                    name={`${selectedLanguage}.image`}
                    onDelete={handleRemoveFile}
                    maxSize={3145728}
                    onUpload={() => console.info('ON UPLOAD')}
                  />
                </Stack>
              </>
            )}
            {step === 2 && (
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <Stack spacing={1}>
                  <Typography variant="subtitle2">Boshlanish sanasi va vaqti</Typography>
                  <Field.MobileDateTimePicker name="start_time" />
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">Tugash sanasi va vaqti</Typography>
                  <Field.MobileDateTimePicker name="end_time" />
                </Stack>

                <Stack spacing={1}>
                  <Typography variant="subtitle2">
                    Registratsiya boshlanish sanasi va vaqti
                  </Typography>
                  <Field.MobileDateTimePicker name="registration.start_time" />
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">Registratsiya tugash sanasi va vaqti</Typography>
                  <Field.MobileDateTimePicker name="registration.end_time" />
                </Stack>

                <Stack spacing={1}>
                  <Typography variant="subtitle2">Yoshi</Typography>
                  <RHFSelect
                    hiddenLabel
                    size="small"
                    name="age_group"
                    data={ageGroupList}
                    placeholder="Yoshi"
                  />
                </Stack>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          {step === 1 && (
            <Button variant="outlined" onClick={onClose}>
              Bekor qilish
            </Button>
          )}
          {step === 2 && (
            <Button variant="outlined" onClick={() => setStep(1)}>
              Ortga
            </Button>
          )}
          {step === 1 && (
            <Button variant="contained" onClick={() => setStep(2)}>
              Kengisi
            </Button>
          )}
          {step === 2 && (
            <LoadingButton type="submit" variant="contained" loading={isPending}>
              Yaratish
            </LoadingButton>
          )}
        </DialogActions>
      </Form>
    </Dialog>
  );
}
