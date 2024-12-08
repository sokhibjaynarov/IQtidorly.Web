'use client';

import type { Books } from 'src/api/books/type';
import type { GridColDef } from '@mui/x-data-grid';

import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import normalizeFileUrl from 'src/utils/normalizeFileUrl';

import { DashboardContent } from 'src/layouts/dashboard';
import { useGetBooks } from 'src/api/books/hooks/useGetBook';
import { useDeleteBook } from 'src/api/books/hooks/useDeleteBook';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarQuickFilter />
  </GridToolbarContainer>
);

export default function BookTable() {
  const router = useRouter();
  const [bookData, setTableData] = useState<any[]>([]);

  const [paginationModel, setPaginationModel] = useState({ pageSize: 25, page: 0 });
  const {
    data: bookList,
    pagination,
    isLoading,
  } = useGetBooks(paginationModel.page, paginationModel.pageSize);

  const { bookDelete } = useDeleteBook();

  const handleDeleteRow = useCallback(
    (id: string) => {
      bookDelete(id);
    },
    [bookDelete]
  );

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.editsBook(id));
    },
    [router]
  );

  const rowCountRef = useRef(pagination?.total_records || 0);
  const rowCount = useMemo(() => {
    if (pagination?.total_records !== undefined) {
      rowCountRef.current = pagination?.total_records;
    }
    return rowCountRef.current;
  }, [pagination?.total_records]);

  useEffect(() => {
    if (bookList?.length) {
      setTableData(bookList);
    }
  }, [bookList]);

  const bookColumns: GridColDef<Books>[] = [
    {
      field: 'cover_path',
      headerName: 'Kitob rasmi',
      width: 200,
      renderCell: ({ value }) => (
        <div style={{ width: 50, height: 50, borderRadius: '50%', overflow: 'hidden' }}>
          <Image src={normalizeFileUrl(value)} alt="Book Image" width={50} height={50} />
        </div>
      ),
    },
    { field: 'title', headerName: 'Kitob nomi', width: 300 },
    {
      field: 'author',
      headerName: 'Muallif',
      renderCell: ({ row }) => <span>{`${row.author.name} ${row.author.surname}`}</span>,
      width: 250,
    },
    { field: 'total_page', headerName: 'Sahifalar soni', width: 180 },
    { field: 'price', headerName: "Narx (so'm)", width: 230 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 150,
      getActions: ({ row }) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(row._id!)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          sx={{ color: 'error.main' }}
          onClick={() => {
            handleDeleteRow(row._id!);
          }}
        />,
      ],
    },
  ];

  return (
    <DashboardContent maxWidth="xl" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Kitoblar"
        links={[{ name: 'Kitoblar ' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.booksCreate}
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Kitob qo&apos;shish
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          height: { xs: 800, md: 2 },
          flexDirection: { md: 'column' },
        }}
      >
        <DataGrid
          rows={bookData}
          columns={bookColumns}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          onPaginationModelChange={setPaginationModel}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          rowCount={rowCount}
          paginationMode="server"
          disableRowSelectionOnClick
          loading={isLoading}
          getRowId={(row) => row?._id}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </Card>
    </DashboardContent>
  );
}
