'use client';

import type {
  GridSlots,
  GridColDef,
  GridRowSelectionModel,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
  DataGrid,
  gridClasses,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { QUESTION_TYPE } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetQuizess } from 'src/api/quizess/hooks/useGetQuizess';
import { useDeleteQuizess } from 'src/api/quizess/hooks/useDeleteQuizess';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import {
  RenderCellName,
  RenderCellSubject,
  RenderCellAgeGroup,
  RenderCellDuration,
  RenderCellLanguage,
  RenderCellStartTime,
} from './content/quizess-table-row';

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const HIDE_COLUMNS = { category: false };

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// Example usage

// ----------------------------------------------------------------------

export function QuizessView() {
  const confirmRows = useBoolean();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const router = useRouter();

  const {
    data: quizessList,
    pagination,
    isLoading,
  } = useGetQuizess(paginationModel.page, paginationModel.pageSize, 'olympiad');

  const { quizessDelete } = useDeleteQuizess();

  const filters = useSetState<any>({ publish: [], stock: [] });

  const [tableData, setTableData] = useState<any[]>([]);

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);

  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);
  const rowCountRef = useRef(pagination?.total_records || 0);

  const rowCount = useMemo(() => {
    if (pagination?.total_records !== undefined) {
      rowCountRef.current = pagination?.total_records;
    }
    return rowCountRef.current;
  }, [pagination?.total_records]);

  useEffect(() => {
    if (quizessList?.length) {
      setTableData(quizessList);
    }
  }, [quizessList]);

  const dataFiltered = applyFilter({ inputData: tableData, filters: filters.state });

  const handleDeleteRow = useCallback(
    (id: string) => {
      quizessDelete(id);
      toast.success('Delete success!');
    },
    [quizessDelete]
  );

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.edit(id));
    },
    [router]
  );

  const CustomToolbarCallback = useCallback(
    () => (
      <CustomToolbar
        setFilterButtonEl={setFilterButtonEl}
        onOpenConfirmDeleteRows={confirmRows.onTrue}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.state, selectedRowIds]
  );

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Savol',
      flex: 1,
      minWidth: 360,

      hideable: false,
      renderCell: (params) => <RenderCellName params={params} />,
    },
    {
      field: 'start_time',
      headerName: 'Boshlanish vaqti',
      width: 160,
      renderCell: (params) => <RenderCellStartTime params={params} />,
    },
    {
      field: 'chapter',
      headerName: 'Fan',
      width: 160,
      renderCell: (params) => <RenderCellSubject params={params} />,
    },
    {
      field: 'age_group',
      headerName: 'Yosh chegarasi',
      width: 160,
      renderCell: (params) => <RenderCellAgeGroup params={params} />,
    },

    {
      field: 'duration',
      headerName: 'Davomiligi',
      width: 160,
      type: 'singleSelect',
      valueOptions: QUESTION_TYPE,
      renderCell: (params) => <RenderCellDuration params={params} />,
    },
    {
      field: 'language',
      headerName: 'Tili',
      width: 110,
      type: 'singleSelect',
      editable: true,
      valueOptions: PUBLISH_OPTIONS,
      renderCell: (params) => <RenderCellLanguage params={params} />,
    },

    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 20,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params?.row?._id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => {
            handleDeleteRow(params?.row?._id);
          }}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <>
      <DashboardContent
        maxWidth="xl"
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <CustomBreadcrumbs
          heading="Olimpiadalar"
          links={[{ name: 'Olimpiada' }]}
          action={
            <Button
              // component={RouterLink}
              // href={paths.dashboard.question}
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Olimpiada qo&apos;shish
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
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={isLoading}
            rowHeight={100}
            getRowId={(row) => row?._id}
            pageSizeOptions={[5, 10, 25]}
            rowCount={rowCount}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: CustomToolbarCallback as GridSlots['toolbar'],
              noRowsOverlay: () => <EmptyContent />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            slotProps={{
              panel: { anchorEl: filterButtonEl },
              toolbar: { setFilterButtonEl },
              columnsManagement: { getTogglableColumns },
            }}
            sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
          />
        </Card>
      </DashboardContent>

      {/* <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selectedRowIds.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirmRows.onFalse();
            }}
          >
            Delete
          </Button>
        }
      /> */}
    </>
  );
}

// ----------------------------------------------------------------------

interface CustomToolbarProps {
  onOpenConfirmDeleteRows: () => void;
  setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

function CustomToolbar({ setFilterButtonEl, onOpenConfirmDeleteRows }: CustomToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />

      <Stack spacing={1} flexGrow={1} direction="row" alignItems="center" justifyContent="flex-end">
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton ref={setFilterButtonEl} />
      </Stack>
    </GridToolbarContainer>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: any[];
  filters: any;
};

function applyFilter({ inputData, filters }: ApplyFilterProps) {
  const { stock, publish } = filters;

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }

  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }

  return inputData;
}
