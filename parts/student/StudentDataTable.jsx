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
import StudentDataRows from './StudentDataRows';
import useDeleteRecord from '../../hooks/useDeleteRecord';
import useDialog from '../../hooks/useDialog';

const columns = [
  { headerName: '#ID', fieldName: '1' },
  { headerName: 'Name', fieldName: '2' },
  { headerName: 'Year', fieldName: '3' },
  { headerName: 'Standard', fieldName: '4' },
];

export default function StudentDataTable() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [page, setPage] = useState({
    pageIndex: 1,
    pageLimit: 6,
    mainQueryKey: 'student',
    subQueryKey: 'list',
    searchText: '',
  });

  const [studentId, setStudentId] = useState(null);

  const { data: students } = useGetPaginatedData(page, {
    keepPreviousData: true,
  });

  const { mutate: deleteStudent } = useDeleteRecord(page.mainQueryKey);
  const { isDialogOpen, handleOpenDialog, handleCloseDialog } = useDialog();

  const handleCreate = () => {
    router.push('student/new');
  };

  const handleEdit = (id) => {
    router.push(`student/${id}`);
  };

  const handleDelete = () => {
    deleteStudent(studentId);
    handleCloseDialog();
    dispatch(
      openAlert({
        alertMessage: 'Record deleted successfully.',
        alertType: 'error',
      })
    );
  };

  const handleConfirmDialogOpen = (id) => {
    setStudentId(id);
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
      <DataTableTitle title="Latest Students" handleCreate={handleCreate} />
      <DataTableSearch page={page} setPage={setPage} />
      <Stack spacing={2}>
        <Box sx={{ overflow: 'hidden' }}>
          <TableContainer sx={{ overflow: { md: 'hidden' } }}>
            <Table sx={{ minWidth: 'max-content' }}>
              <DataTableColumns columns={columns} />
              <StudentDataRows
                handleEdit={handleEdit}
                handleConfirmDialogOpen={handleConfirmDialogOpen}
                records={students}
              />
            </Table>
          </TableContainer>
        </Box>
        <CustomPagination
          pageIndex={page.pageIndex}
          totalPages={students?.totalPages}
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
