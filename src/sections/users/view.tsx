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
import {
  DataGrid,
  gridClasses,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { QUESTION_TYPE } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetRegUsers } from 'src/api/reg-user/hooks/useGetRegUsers';

import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import {
  RenderCellName,
  RenderCellPhone,
  RenderCellGender,
  RenderCellAddress,
  RenderCellDateOfBirth,
  RenderCellSchooleAddress,
} from './content/users-table-row';

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const HIDE_COLUMNS = { category: false };

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// Example usage

// ----------------------------------------------------------------------

export function RegisteredUserView() {
  const confirmRows = useBoolean();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const {
    data: regUsersList,
    pagination,
    isLoading,
  } = useGetRegUsers(paginationModel.page, paginationModel.pageSize);

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
    if (regUsersList?.length) {
      setTableData(regUsersList);
    }
  }, [regUsersList]);

  const dataFiltered = applyFilter({ inputData: tableData, filters: filters.state });

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
      field: 'fio',
      headerName: 'F.I.SH',
      flex: 1,
      minWidth: 160,
      hideable: false,
      renderCell: (params) => <RenderCellName params={params} />,
    },
    {
      field: 'phone',
      headerName: 'Telefon raqam',
      width: 160,
      renderCell: (params) => <RenderCellPhone params={params} />,
    },
    {
      field: 'address',
      headerName: 'Yashash manzili',
      width: 400,
      renderCell: (params) => <RenderCellAddress params={params} />,
    },
    {
      field: 'date_of_birth',
      headerName: "Tug'ilgan sana",
      width: 160,
      renderCell: (params) => <RenderCellDateOfBirth params={params} />,
    },

    {
      field: 'occupation',
      headerName: "O'qish joyi",
      width: 160,
      type: 'singleSelect',
      valueOptions: QUESTION_TYPE,
      renderCell: (params) => <RenderCellSchooleAddress params={params} />,
    },
    {
      field: 'gender',
      headerName: 'Jinsi',
      width: 110,
      type: 'singleSelect',
      editable: true,
      valueOptions: PUBLISH_OPTIONS,
      renderCell: (params) => <RenderCellGender params={params} />,
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <DashboardContent maxWidth="xl" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Foydalanuvchilar"
        links={[{ name: '' }]}
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
          initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
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
