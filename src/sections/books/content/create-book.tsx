'use client';

import type { Books } from 'src/api/books/type';
import type { BooksAuthor } from 'src/api/booksAuthor/type';

import { z as zod } from 'zod';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { useMemo, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Link,
  Stack,
  Container,
  CardHeader,
  Typography,
  IconButton,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import useFileUploader from 'src/utils/file-uploader';
import normalizeFileUrl from 'src/utils/normalizeFileUrl';

import { useEditBook } from 'src/api/books/hooks/useEditBook';
import { useCreateBook } from 'src/api/books/hooks/useCreateBook';

import { Iconify } from 'src/components/iconify';
import { schemaHelper } from 'src/components/hook-form/schema-helper';
import { Form, Field, RHFTextField, RHFUploadBox } from 'src/components/hook-form';

const NewBookSchema = zod.object({
  title: zod.string().min(1, { message: 'Kitob nomi talab qilinadi' }),
  cover: schemaHelper.file({ message: { required_error: 'Rasm talab qilinadi!' } }),
  description: schemaHelper
    .editor()
    .min(17, { message: 'Tavsif kamida 10 belgidan iborat bo‘lishi kerak' }),
  author: zod.string().min(1, { message: 'Muallif ismi va familiyasi talab qilinadi' }),
  short_description: schemaHelper.file({
    message: { required_error: 'Kitobning qisqa fayli talab qilinadi!' },
  }),
  full_description: schemaHelper.file({
    message: { required_error: 'Kitobning to‘liq fayli talab qilinadi!' },
  }),
  price: zod.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    zod.number().min(0, { message: 'Narx musbat son bo‘lishi kerak' })
  ),
  total_page: zod.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    zod.number().min(0, { message: 'Kitob sahifalar soni talab qilinadi' })
  ),
});

export type bookSchemaType = zod.infer<typeof NewBookSchema>;

interface IProps {
  currentBook?: Books;
  authors: BooksAuthor[];
}

export default function CreateBookView({ currentBook, authors }: IProps) {
  const defaultValues = useMemo(
    () => ({
      title: currentBook?.title || '',
      price: currentBook?.price || undefined,
      total_page: currentBook?.total_page || undefined,
      cover: normalizeFileUrl(currentBook?.cover_path) || '',
      description: currentBook?.description || '',
      author: currentBook?.author._id || '',
      short_description: currentBook?.short_description_file_path || '',
      full_description: currentBook?.full_description_file_path || '',
    }),
    [currentBook]
  );
  const { uploadFile, isPending } = useFileUploader();

  const methods = useForm<bookSchemaType>({
    resolver: zodResolver(NewBookSchema),
    defaultValues,
  });
  const { handleSubmit, setValue, watch } = methods;

  const shortDescription = watch('short_description');
  const fullDescription = watch('full_description');

  const { bookCreate, isPending: isCreatePending } = useCreateBook();
  const { bookEdit, isPending: isEditPending } = useEditBook(currentBook?._id);

  const handleRemoveFile = useCallback(() => {
    setValue('cover', '');
  }, [setValue]);

  const onSubmit = handleSubmit(async (bookData) => {
    const uploadedCover = await uploadFile<bookSchemaType>(bookData, `cover`);
    const uploadedShortFile = await uploadFile<bookSchemaType>(uploadedCover, `short_description`);
    const uploadedFullFile = await uploadFile<bookSchemaType>(
      uploadedShortFile,
      `full_description`
    );

    if (currentBook) {
      bookEdit(uploadedFullFile);
    } else {
      bookCreate(uploadedFullFile);
    }
  });

  return (
    <Container maxWidth="md">
      <Form methods={methods} onSubmit={onSubmit}>
        <Box display="flex" flexDirection="column" p={2} m={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ bgcolor: 'white', borderRadius: 50 }}>
              <IconButton href={paths.dashboard.books}>
                <Icon icon="openmoji:return" />
              </IconButton>
            </Box>
            <Typography variant="h4">Kitob qo&apos;shish</Typography>
          </Stack>

          <Card sx={{ p: 3, mt: 2 }}>
            <Stack spacing={3}>
              <CardHeader
                title="Kitob haqida qo'shimcha ma’lumotlar"
                subheader="Muqova, kitobning nomi, kitob haqida batafsil..."
                sx={{ mb: 3, p: 0 }}
              />

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Muqova</Typography>
                <Field.Upload
                  name="cover"
                  onDelete={handleRemoveFile}
                  thumbnail
                  onUpload={() => console.info('ON UPLOAD')}
                />
              </Stack>

              <RHFTextField name="title" label="Kitobning nomi" variant="outlined" fullWidth />

              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
              >
                <Field.Text name="price" label="Kitobning narxi" variant="outlined" fullWidth />
                <Field.Text
                  name="total_page"
                  label="Kitob sahifalar soni"
                  variant="outlined"
                  fullWidth
                />
              </Box>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Kitob haqida batafsil</Typography>
                <Field.Editor name="description" sx={{ maxHeight: 480 }} />
              </Stack>
            </Stack>
          </Card>

          <Card sx={{ p: 3, mt: 2 }}>
            <Stack spacing={3}>
              <CardHeader
                title="Kitob haqida qo‘shimcha ma’lumotlar"
                subheader="Muallif, qisqa va to‘liq fayllar..."
                sx={{ p: 0 }}
              />
              <Field.Select
                name="author"
                label="Kitob muallifi"
                variant="outlined"
                fullWidth
                data={authors.map((author) => ({
                  _id: author._id || '',
                  name: `${author.name} ${author.surname}`,
                }))}
              />

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Kitobning qisqa fayli</Typography>
                <RHFUploadBox
                  name="short_description"
                  onDrop={(files) => setValue('short_description', files[0])}
                  placeholder={
                    !shortDescription ? (
                      <Box
                        sx={{
                          gap: 0.5,
                          display: 'flex',
                          alignItems: 'center',
                          color: 'text.disabled',
                          flexDirection: 'column',
                        }}
                      >
                        <Iconify icon="eva:cloud-upload-fill" width={40} />
                        <Typography variant="body2">
                          Fayllarni shu yerga tashlang yoki kompyuteringizni koʻrib chiqish uchun
                          bosing.
                        </Typography>
                      </Box>
                    ) : shortDescription instanceof File ? (
                      shortDescription?.name
                    ) : (
                      shortDescription
                    )
                  }
                  sx={{
                    py: 2.5,
                    width: 'auto',
                    height: 'auto',
                    borderRadius: 1.5,
                  }}
                />
                {currentBook?.short_description_file_path ? (
                  <Link
                    href={normalizeFileUrl(currentBook?.short_description_file_path)}
                    target="_blank"
                  >
                    Faylni ko‘rib chiqish
                  </Link>
                ) : null}
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Kitobning to‘liq fayli</Typography>
                <RHFUploadBox
                  name="full_description"
                  onDrop={(files) => setValue('full_description', files[0])}
                  placeholder={
                    !fullDescription ? (
                      <Box
                        sx={{
                          gap: 0.5,
                          display: 'flex',
                          alignItems: 'center',
                          color: 'text.disabled',
                          flexDirection: 'column',
                        }}
                      >
                        <Iconify icon="eva:cloud-upload-fill" width={40} />
                        <Typography variant="body2">
                          Fayllarni shu yerga tashlang yoki kompyuteringizni koʻrib chiqish uchun
                          bosing.
                        </Typography>
                      </Box>
                    ) : fullDescription instanceof File ? (
                      fullDescription?.name
                    ) : (
                      fullDescription
                    )
                  }
                  sx={{
                    py: 2.5,
                    width: 'auto',
                    height: 'auto',
                    borderRadius: 1.5,
                  }}
                />
                {currentBook?.full_description_file_path ? (
                  <Link
                    href={normalizeFileUrl(currentBook?.full_description_file_path)}
                    target="_blank"
                  >
                    Faylni ko‘rib chiqish
                  </Link>
                ) : null}
              </Stack>
            </Stack>
          </Card>

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
            <LoadingButton
              variant="contained"
              color="primary"
              type="submit"
              loading={currentBook ? isEditPending || isPending : isCreatePending || isPending}
            >
              {currentBook ? `Tahrirlash` : `Saqlash`}
            </LoadingButton>
          </Stack>
        </Box>
      </Form>
    </Container>
  );
}
