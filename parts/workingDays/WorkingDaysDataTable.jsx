import React, { useState } from 'react';
import { Box, Stack, Table, TableContainer } from '@mui/material';
import { useDispatch } from 'react-redux';

// custom hooks import
import useGetPaginatedRecords from '../../hooks/useGetPaginatedRecords';
import useDeleteRecord from '../../hooks/useDeleteRecord';
import useModal from '../../hooks/useModal';
import useDialog from '../../hooks/useDialog';

import { openAlert } from '../../features/modal/modalSlice';

// custom components import
import CustomModal from '../../components/other/CustomModal';
import ConfirmDialog from '../../components/other/ConfirmDialog';
import CustomAlert from '../../components/other/CustomAlert';
import CustomPagination from '../../components/other/CustomPagination';

import DataTableTitle from '../../components/data-table/DataTableTitle';
import DataTableColumns from '../../components/data-table/DataTableColumns';
import DataTableSearch from '../../components/data-table/DataTableSearch';
import WorkingDaysDataRows from './WorkingDaysDataRows';
import WorkingDaysForm from './WorkingDaysForm';
import { defaultValues } from '../../schemas/workingDaysSchema';

const columns = [
  { headerName: 'Educational Year', fieldName: 'educational_year' },
  { headerName: 'Month', fieldName: 'month' },
  { headerName: 'Educational Days', fieldName: 'educational_days' },
  { headerName: 'Teaching Days', fieldName: 'teaching_days' },
  { headerName: 'Non-teaching Days', fieldName: 'nonteaching_days' },
  { headerName: 'Service Days', fieldName: 'service_days' },
];

function WorkingDaysDataTable() {
  const dispatch = useDispatch();

  const [page, setPage] = useState({
    pageIndex: 1,
    pageLimit: 5,
    mainQueryKey: 'workingdays',
    subQueryKey: 'list',
    searchText: '',
  });

  const [id, setId] = useState(null);

  const [editFormValues, setEditFormValues] = useState(defaultValues);
  const [editMode, setEditMode] = useState(false);

  const { data: workingDays } = useGetPaginatedRecords(page, {
    keepPreviousData: true,
  });

  const { mutate: deleteWorkingDays } = useDeleteRecord(page.mainQueryKey);
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const { isDialogOpen, handleOpenDialog, handleCloseDialog } = useDialog();

  const handleCreate = () => {
    handleOpenModal();
    setEditMode(false);
    setEditFormValues(defaultValues);
  };

  const handleEdit = (workingDaysData) => {
    setEditFormValues({ ...workingDaysData });
    setEditMode(true);
    handleOpenModal();
  };

  const handleDelete = () => {
    deleteWorkingDays(id);
    handleCloseDialog();
    dispatch(
      openAlert({
        alertMessage: 'Record deleted successfully.',
        alertType: 'error',
      })
    );
  };

  const handleConfirmDialogOpen = (itemId) => {
    setId(itemId);
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
      <DataTableTitle title="Working Days" handleCreate={handleCreate} />
      <DataTableSearch page={page} setPage={setPage} />
      <Stack>
        <Box sx={{ overflow: 'hidden' }}>
          <TableContainer sx={{ overflow: { md: 'hidden' } }}>
            <Table sx={{ minWidth: 700 }}>
              <DataTableColumns columns={columns} />
              <WorkingDaysDataRows
                handleEdit={handleEdit}
                handleConfirmDialogOpen={handleConfirmDialogOpen}
                records={workingDays}
                columns={columns}
              />
            </Table>
          </TableContainer>
        </Box>
        <CustomPagination
          pageIndex={page.pageIndex}
          totalPages={workingDays?.totalPages}
          handlePageIndex={handlePageIndex}
        />
      </Stack>
      <CustomModal
        editMode={editMode}
        title="Working Days"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      >
        <WorkingDaysForm
          editFormValues={editFormValues}
          handleCloseModal={handleCloseModal}
        />
      </CustomModal>
      <ConfirmDialog
        onDialogConfirm={handleDelete}
        isDialogOpen={isDialogOpen}
        handleCloseDialog={handleCloseDialog}
      />
      <CustomAlert />
    </Stack>
  );
}

export default WorkingDaysDataTable;
