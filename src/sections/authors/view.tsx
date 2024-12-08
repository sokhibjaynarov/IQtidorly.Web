'use client';

import type { GridColDef } from '@mui/x-data-grid';

import { toast } from 'sonner';
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
import { useGetAuthors } from 'src/api/booksAuthor/hooks/useGetAuthor';
import { useDeleteAuthor } from 'src/api/booksAuthor/hooks/useDeleteAuthor';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarQuickFilter />
  </GridToolbarContainer>
);

export default function AuthorTable() {
  const authorColumns: GridColDef[] = [
    {
      field: 'photo_path',
      headerName: 'Muallif rasmi',
      width: 200,
      renderCell: ({ value }) => (
        <div style={{ width: 50, height: 50, overflow: 'hidden' }}>
          <Image src={normalizeFileUrl(value)} alt="Author Image" width={50} height={50} />
        </div>
      ),
    },
    { field: 'name', headerName: 'Muallif ismi', width: 350 },
    { field: 'surname', headerName: 'Muallif familiyasi', width: 350 },
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
          onClick={() => handleEditRow(row?._id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => {
            handleDeleteRow(row?._id);
          }}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });
  const router = useRouter();
  const {
    data: authorList,
    pagination,
    isLoading,
  } = useGetAuthors(paginationModel.page, paginationModel.pageSize);
  const [authorData, setTableData] = useState<any[]>([]);

  const { authorDelete } = useDeleteAuthor();

  const handleDeleteRow = useCallback(
    (id: string) => {
      authorDelete(id);
      toast.success('Delete success!');
    },
    [authorDelete]
  );

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.edits(id));
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
    if (authorList?.length) {
      setTableData(authorList);
    }
  }, [authorList]);

  return (
    <DashboardContent maxWidth="xl" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Mualliflar"
        links={[{ name: 'Mualliflar ' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.authorCreate}
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Muallif Qo&apos;shish
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          height: 'auto',
          flexDirection: { md: 'column' },
        }}
      >
        <DataGrid
          rows={authorData}
          columns={authorColumns}
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
