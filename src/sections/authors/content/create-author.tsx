'use client';

import type { BooksAuthor } from 'src/api/booksAuthor/type';

import { z as zod } from 'zod';
import { useMemo } from 'react';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Stack, Container, CardHeader, Typography, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';

import useFileUploader from 'src/utils/file-uploader';
import normalizeFileUrl from 'src/utils/normalizeFileUrl';

import { useEditAuthor } from 'src/api/booksAuthor/hooks/useEditAuthor';
import { useCreateAuthor } from 'src/api/booksAuthor/hooks/useCreateAuthor';

import { Form, Field } from 'src/components/hook-form';
import { schemaHelper } from 'src/components/hook-form/schema-helper';

const NewAuthorSchema = zod.object({
  photo_path: schemaHelper.file({ message: { required_error: 'Muallif rasmi talab qilinadi!' } }),
  name: zod.string().min(1, { message: 'Muallif ismi talab qilinadi' }),
  surname: zod.string().min(1, { message: 'Muallif familiyasi talab qilinadi' }),
});

export type NewAuthorSchemaType = zod.infer<typeof NewAuthorSchema>;

export default function CreateAuthorView({ currentAuthor }: any) {
  const defaultValues = useMemo(
    () => ({
      photo_path: normalizeFileUrl(currentAuthor?.photo_path) || '',
      name: currentAuthor?.name || '',
      surname: currentAuthor?.surname || '',
    }),
    [currentAuthor]
  );

  const methods = useForm<NewAuthorSchemaType>({
    resolver: zodResolver(NewAuthorSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const { uploadFile } = useFileUploader();
  const { authorCreate, isPending: isCreatePendig } = useCreateAuthor();
  const { authorEdit, isPending: isEditPending } = useEditAuthor(currentAuthor?._id);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const values = await uploadFile<BooksAuthor>(data, 'photo_path');

      if (currentAuthor) {
        authorEdit(values);
      } else {
        authorCreate(values);
      }
      router.push(paths.dashboard.author);
    } catch (error) {
      console.error('Failed to handle author operation:', error);
    }
  });

  return (
    <Container maxWidth="md">
      <Form methods={methods} onSubmit={onSubmit}>
        <Box display="flex" flexDirection="column" p={2} m={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ bgcolor: 'white', borderRadius: 50 }}>
              <IconButton href={paths.dashboard.author}>
                <Icon icon="openmoji:return" />
              </IconButton>
            </Box>
            <Typography variant="h4">Muallif qo&apos;shish</Typography>
          </Stack>
          <Card sx={{ p: 3, mt: 2 }}>
            <Stack spacing={3}>
              <CardHeader
                title="Muallif haqida ma’lumotlar"
                subheader="Ism, familiya, muallif rasmi"
                sx={{ mb: 3, p: 0 }}
              />
              <Typography variant="subtitle2">Kitob muallifning surati</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Field.UploadAvatar name="photo_path" maxSize={3145728} />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 1,
                      color: 'text.disabled',
                    }}
                  >
                    Ruxsat berilgan *.jpeg, *.jpg, *.png, *.gif
                    <br />
                    Maksimal hajmi 3,1 MB
                  </Typography>
                </Box>
              </Stack>

              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
              >
                <Field.Text name="name" label="Muallif ismi" variant="outlined" fullWidth />
                <Field.Text
                  name="surname"
                  label="Muallif familiyasi"
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </Stack>
          </Card>
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
            <LoadingButton
              variant="contained"
              color="primary"
              type="submit"
              loading={currentAuthor ? isEditPending : isCreatePendig}
            >
              {currentAuthor ? `Tahrirlash` : `Saqlash`}
            </LoadingButton>
          </Stack>
        </Box>
      </Form>
    </Container>
  );
}
