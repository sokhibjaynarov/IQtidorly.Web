'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Dialog,
  CardMedia,
  Typography,
  IconButton,
  CardContent,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import downloadFile from 'src/utils/downloadFile';
import { formatCurrency } from 'src/utils/formatCurrency';
import normalizeFileUrl from 'src/utils/normalizeFileUrl';

import { useGetBooks } from 'src/api/books/hooks/useGetBook';
import { useCreateBookOrder } from 'src/api/books/hooks/useCreateBookOrder';

import { LoadingScreen } from 'src/components/loading-screen';

import { useAuthContext } from 'src/auth/hooks';

export function BooksShopView() {
  const { authenticated, user } = useAuthContext();

  const { data: books, isLoading } = useGetBooks(0, 100);
  const { createBookOrder } = useCreateBookOrder();
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [selectedBookPdf, setSelectedBookPdf] = useState<string | null>(null);

  const handleOpenModal = (pdfUrl: string) => {
    setSelectedBookPdf(normalizeFileUrl(pdfUrl));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBookPdf(null);
  };

  const handleBuyBook = async (id: string, price: number) => {
    if (authenticated) {
      await createBookOrder({ user: user?._id, book: id, amount: price });

      const merchantId = process.env.NEXT_PUBLIC_MERCHENT_ID;
      const inputString = `m=${merchantId};ac.book_id=${id};ac.user_id=${user?._id};a=${price * 100}`;
      const base64String = btoa(inputString);

      router.push(`https://checkout.paycom.uz/${base64String}`);
    } else {
      router.push(paths.auth.jwt.signIn);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ flexGrow: 1, p: 3, width: '80%', mx: 'auto' }}
      >
        <Box sx={{ bgcolor: 'white', borderRadius: 50 }}>
          <IconButton href="/">
            <Icon icon="openmoji:return" />
          </IconButton>
        </Box>
        <Typography variant="h4">Sotib olish</Typography>
      </Stack>

      <Box sx={{ flexGrow: 1, p: 3, width: '80%', mx: 'auto' }}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <Grid container spacing={2}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={3} key={book._id}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    image={normalizeFileUrl(book.cover_path)}
                    alt={book.title}
                    sx={{ padding: 2, height: 280, objectFit: 'contain' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {book.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Icon icon="majesticons:edit-pen-4-line" width={24} height={24} />
                      <Typography variant="body2">{`${book.author.name} ${book.author.surname}`}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                      <Icon icon="fluent:document-copy-24-regular" width={24} height={24} />
                      <Typography variant="body2">{book.total_page} varoq</Typography>
                    </Stack>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      {formatCurrency(book.price)}
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={() => handleOpenModal(book.short_description_file_path)}
                        fullWidth
                      >
                        Ko‘rish
                      </Button>
                      {book.is_paid ? (
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth
                          onClick={() =>
                            downloadFile({
                              fileUrl: normalizeFileUrl(book.full_description_file_path),
                              fileName: `${book.title}.pdf`,
                            })
                          }
                        >
                          Yuklab olish
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth
                          onClick={() => handleBuyBook(book._id, book.price)}
                        >
                          Sotib olish
                        </Button>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle>
            <Typography variant="h4">Kitobni ko‘rish</Typography>
            <IconButton
              onClick={handleCloseModal}
              sx={{ position: 'absolute', right: 20, top: 25 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {selectedBookPdf && (
              <iframe src={selectedBookPdf} width="100%" height="500px" title="Book PDF" />
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
