'use client';

import type { UseSetStateReturn } from 'src/hooks/use-set-state';
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
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { QUESTION_TYPE } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetQuestions } from 'src/api/question/hooks/useGetQuestion';
import { useDeleteQuestion } from 'src/api/question/hooks/useDeleteQuestion';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { QuizessForm } from './content/quizess-form';
import { ViewQuestion } from './content/view-question';
import {
  RenderCellName,
  RenderCellType,
  RenderCellSubject,
  RenderCellAgeGroup,
  RenderCellCreatedAt,
  RenderCellDifficulty,
} from './content/question-table-row';

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const HIDE_COLUMNS = { category: false };

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// Example usage

// ----------------------------------------------------------------------

export function QuestionsView() {
  const confirmRows = useBoolean();

  const viewRows = useBoolean();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const router = useRouter();

  const {
    data: questionList,
    pagination,
    isLoading,
  } = useGetQuestions(paginationModel.page, paginationModel.pageSize);

  const filters = useSetState<any>({ publish: [], stock: [] });

  const [tableData, setTableData] = useState<any[]>([]);

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);

  const [viewRowQuestion, setViewRowQuestions] = useState<string>('');

  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);
  const { questionDelete } = useDeleteQuestion();

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
    if (questionList?.length) {
      setTableData(questionList);
    }
  }, [questionList]);
  const handleRowSelection = (newSelectionModel: any) => {
    const selectedRows = newSelectionModel.map((id: any) =>
      dataFiltered.find((row) => row._id === id)
    );

    const additionalData = selectedRows.map((row: any) => ({
      id: row._id,
      name: row.age_group,
    }));

    setSelectedRowIds(additionalData);
  };

  const canReset = filters.state.publish.length > 0 || filters.state.stock.length > 0;

  const dataFiltered = applyFilter({ inputData: tableData, filters: filters.state });

  const handleDeleteRow = useCallback(
    (id: string) => {
      questionDelete(id);
      toast.success('Delete success!');
    },
    [questionDelete]
  );

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.edit(id));
    },
    [router]
  );

  const handleViwRow = useCallback(
    (id: string) => {
      viewRows.onTrue();
      setViewRowQuestions(id);
    },
    [viewRows]
  );

  const CustomToolbarCallback = useCallback(
    () => (
      <CustomToolbar
        filters={filters}
        canReset={canReset}
        selectedRowIds={selectedRowIds}
        setFilterButtonEl={setFilterButtonEl}
        filteredResults={dataFiltered.length}
        onOpenConfirmDeleteRows={confirmRows.onTrue}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.state, selectedRowIds]
  );

  const columns: GridColDef[] = [
    { field: 'category', headerName: 'Category', filterable: false },
    {
      field: 'content',
      headerName: 'Savol',
      flex: 1,
      minWidth: 360,
      hideable: false,
      renderCell: (params) => <RenderCellName params={params} />,
    },
    {
      field: 'subject',
      headerName: 'Fan',
      width: 160,
      renderCell: (params) => <RenderCellSubject params={params} />,
    },
    // {
    //   field: 'chapter',
    //   headerName: 'Bolim',
    //   width: 160,
    //   renderCell: (params) => <RenderCellChapter params={params} />,
    // },
    {
      field: 'age_group',
      headerName: 'Yosh chegarasi',
      width: 160,
      renderCell: (params) => <RenderCellAgeGroup params={params} />,
    },

    {
      field: 'type',
      headerName: 'Savol turi',
      width: 160,
      type: 'singleSelect',
      valueOptions: QUESTION_TYPE,
      renderCell: (params) => <RenderCellType params={params} />,
    },
    {
      field: 'difficulty',
      headerName: 'Qiyinlik darajasi',
      width: 110,
      type: 'singleSelect',
      editable: true,
      valueOptions: PUBLISH_OPTIONS,
      renderCell: (params) => <RenderCellDifficulty params={params} />,
    },
    {
      field: 'created_at',
      headerName: 'Yaratilgan Sana',
      width: 160,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
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
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          onClick={() => {
            handleViwRow(params?.row?._id);
          }}
        />,
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
    <DashboardContent maxWidth="xl" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Savollar"
        links={[{ name: 'Savolar ' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.question}
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Savol Qo&apos;shish
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
          checkboxSelection
          disableRowSelectionOnClick
          rows={dataFiltered}
          columns={columns}
          loading={isLoading}
          rowHeight={100}
          getRowId={(row) => row?._id}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          rowCount={rowCount}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          onRowSelectionModelChange={(newSelectionModel) => handleRowSelection(newSelectionModel)}
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
      <QuizessForm
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        selectedQuizess={selectedRowIds}
      />
      <ViewQuestion id={viewRowQuestion} open={viewRows.value} onClose={viewRows.onFalse} />,
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

interface CustomToolbarProps {
  canReset: boolean;
  filteredResults: number;
  selectedRowIds: GridRowSelectionModel;
  onOpenConfirmDeleteRows: () => void;
  filters: UseSetStateReturn<any>;
  setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

function CustomToolbar({
  filters,
  canReset,
  selectedRowIds,
  filteredResults,
  setFilterButtonEl,
  onOpenConfirmDeleteRows,
}: CustomToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />

      <Stack spacing={1} flexGrow={1} direction="row" alignItems="center" justifyContent="flex-end">
        {!!selectedRowIds.length && (
          <Button variant="contained" color="primary" onClick={onOpenConfirmDeleteRows}>
            {` Olimpiada yaratish (${selectedRowIds.length})`}
          </Button>
        )}

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
