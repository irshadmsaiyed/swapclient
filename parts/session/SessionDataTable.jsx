import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Stack,
  Table,
  TableContainer,
} from '@mui/material';
import { useDispatch } from 'react-redux';

// custom hooks import
import useGetPaginatedRecords from '../../hooks/useGetPaginatedRecords';
import useDeleteRecord from '../../hooks/useDeleteRecord';

import {
  openModal,
  openAlert,
  openCofirmDialog,
  closeCofirmDialog,
} from '../../features/modal/modalSlice';

// custom components import
import CustomModal from '../../components/other/CustomModal';
import ConfirmDialog from '../../components/other/ConfirmDialog';
import CustomAlert from '../../components/other/CustomAlert';
import CustomPagination from '../../components/other/CustomPagination';

import DataTableTitle from '../../components/data-table/DataTableTitle';
import DataTableColumns from '../../components/data-table/DataTableColumns';
import DataTableSearch from '../../components/data-table/DataTableSearch';
import SessionDataRows from './SessionDataRows';
import SessionForm from '../session/SessionForm';
import { defaultValues } from '../../schemas/sessionSchema';

const columns = [
  { headerName: 'Educational Year', fieldName: 'educational_year' },
  { headerName: 'Session-1 Period', fieldName: 'session1_start' },
  { headerName: 'Session-2 Period', fieldName: 'session2_start' },
  { headerName: 'Diwali Vacation', fieldName: 'diwali_start' },
  { headerName: 'Summer Vacation', fieldName: 'summer_start' },
];

function SessionDataTable() {
  const dispatch = useDispatch();

  const [page, setPage] = useState({
    pageIndex: 1,
    pageLimit: 5,
    mainQueryKey: 'session',
    subQueryKey: 'list',
    searchText: '',
  });

  const [id, setId] = useState(null);

  const [editFormValues, setEditFormValues] = useState(defaultValues);
  const [editMode, setEditMode] = useState(false);

  const { data: sessions } = useGetPaginatedRecords(page, {
    keepPreviousData: true,
  });

  const { mutate: deleteSession } = useDeleteRecord(page.mainQueryKey);

  const handleCreate = () => {
    dispatch(openModal());
    setEditMode(false);
    setEditFormValues(defaultValues);
  };

  const handleEdit = (session) => {
    setEditFormValues({ ...session });
    setEditMode(true);
    dispatch(openModal());
  };

  const handleDelete = () => {
    deleteSession(id);
    dispatch(closeCofirmDialog());
    dispatch(
      openAlert({
        alertMessage: 'Record deleted successfully.',
        alertType: 'error',
      })
    );
  };

  const handleConfirmDialogOpen = (itemId) => {
    setId(itemId);
    dispatch(openCofirmDialog());
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
      <DataTableTitle title="Latest Sessions" handleCreate={handleCreate} />
      <DataTableSearch page={page} setPage={setPage} />
      <Stack>
        <Box sx={{ overflow: 'hidden' }}>
          <TableContainer sx={{ overflow: { md: 'hidden' } }}>
            <Table sx={{ minWidth: 700 }}>
              <DataTableColumns columns={columns} />
              <SessionDataRows
                handleEdit={handleEdit}
                handleConfirmDialogOpen={handleConfirmDialogOpen}
                records={sessions}
                columns={columns}
              />
            </Table>
          </TableContainer>
        </Box>
        <CustomPagination
          pageIndex={page.pageIndex}
          totalPages={sessions?.totalPages}
          handlePageIndex={handlePageIndex}
        />
      </Stack>
      <CustomModal editMode={editMode} title="Session" key="Session">
        <SessionForm editFormValues={editFormValues} key="Session" />
      </CustomModal>
      <ConfirmDialog onDialogConfirm={handleDelete} />
      <CustomAlert />
    </Stack>
  );
}

export default SessionDataTable;
