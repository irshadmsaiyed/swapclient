import React, { useState } from 'react';
import { Box, Stack, Table, TableContainer } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// custom hooks import
import useGetPaginatedData from '../../hooks/useGetPaginatedRecords';
import { openAlert } from '../../features/modal/modalSlice';

// custom components import
import ConfirmDialog from '../../components/other/ConfirmDialog';
import CustomAlert from '../../components/other/CustomAlert';
import CustomPagination from '../../components/other/CustomPagination';
import DataTableSearch from '../../components/data-table/DataTableSearch';
import DataTableTitle from '../../components/data-table/DataTableTitle';
import DataTableColumns from '../../components/data-table/DataTableColumns';
import EmployeeDataRows from './EmployeeDataRows';
import useDeleteRecord from '../../hooks/useDeleteRecord';
import useDialog from '../../hooks/useDialog';

const columns = [
  { headerName: '#ID', fieldName: '1' },
  { headerName: 'Name', fieldName: '2' },
  { headerName: 'Section', fieldName: '3' },
  { headerName: 'Qualification', fieldName: '4' },
  { headerName: 'Contact', fieldName: '5' },
];

export default function EmployeeDataTable() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [page, setPage] = useState({
    pageIndex: 1,
    pageLimit: 6,
    mainQueryKey: 'employee',
    subQueryKey: 'list',
    searchText: '',
  });

  const [employeeId, setEmployeeId] = useState(null);

  const { data: employees } = useGetPaginatedData(page, {
    keepPreviousData: true,
  });

  const { mutate: deleteEmployee } = useDeleteRecord(page.mainQueryKey);
  const { isDialogOpen, handleOpenDialog, handleCloseDialog } = useDialog();

  const handleCreate = () => {
    router.push('employee/new');
  };

  const handleEdit = (id) => {
    router.push(`employee/${id}`);
  };

  const handleDelete = () => {
    deleteEmployee(employeeId);
    handleCloseDialog();
    dispatch(
      openAlert({
        alertMessage: 'Record deleted successfully.',
        alertType: 'error',
      })
    );
  };

  const handleConfirmDialogOpen = (id) => {
    setEmployeeId(id);
    handleOpenDialog();
  };

  const handlePageIndex = (event, value) => {
    setPage({ ...page, pageIndex: value });
  };

  return (
    <Stack
      sx={{
        bgcolor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
        overflow: 'hidden',
      }}
    >
      <DataTableTitle title="Latest Employees" handleCreate={handleCreate} />
      <DataTableSearch page={page} setPage={setPage} />
      <Stack spacing={2}>
        <Box sx={{ overflow: 'hidden' }}>
          <TableContainer sx={{ overflow: { md: 'hidden' } }}>
            <Table sx={{ minWidth: 'max-content' }}>
              <DataTableColumns columns={columns} />
              <EmployeeDataRows
                handleEdit={handleEdit}
                handleConfirmDialogOpen={handleConfirmDialogOpen}
                records={employees}
              />
            </Table>
          </TableContainer>
        </Box>
        <CustomPagination
          pageIndex={page.pageIndex}
          totalPages={employees?.totalPages}
          handlePageIndex={handlePageIndex}
        />
      </Stack>
      <ConfirmDialog
        onDialogConfirm={handleDelete}
        isDialogOpen={isDialogOpen}
        handleCloseDialog={handleCloseDialog}
      />
      <CustomAlert />
    </Stack>
  );
}
