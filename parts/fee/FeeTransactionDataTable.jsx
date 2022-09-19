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
import FeeTransactionDataRows from './FeeTransactionDataRows';
import FeeTransactionForm from './FeeTransactionForm';
import { defaultValues } from '../../schemas/feeTransactionSchema';

const columns = [
  { headerName: '#Receipt No', fieldName: '1' },
  { headerName: 'Educational Year', fieldName: '2' },
  { headerName: 'Student Details', fieldName: '3' },
  { headerName: 'Fee Type', fieldName: '5' },
  { headerName: 'Fee Details', fieldName: '6' },
  { headerName: 'Mode of Payment', fieldName: '7' },
];

function FeeTransactionDataTable() {
  const dispatch = useDispatch();

  const [page, setPage] = useState({
    pageIndex: 1,
    pageLimit: 5,
    mainQueryKey: 'transaction',
    subQueryKey: 'list',
    searchText: '',
  });

  const [id, setId] = useState(null);

  const [editFormValues, setEditFormValues] = useState(defaultValues);
  const [editMode, setEditMode] = useState(false);

  const { data: feeTransactions } = useGetPaginatedRecords(page, {
    keepPreviousData: true,
  });

  const { mutate: deleteFeeTransaction } = useDeleteRecord(page.mainQueryKey);
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const { isDialogOpen, handleOpenDialog, handleCloseDialog } = useDialog();

  const handleCreate = () => {
    handleOpenModal();
    setEditMode(false);
    setEditFormValues(defaultValues);
  };

  const handleEdit = (feeTransaction) => {
    setEditFormValues({ ...feeTransaction });
    setEditMode(true);
    handleOpenModal();
  };

  const handleDelete = () => {
    deleteFeeTransaction(id);
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
      <DataTableTitle title="Fee Transactions" handleCreate={handleCreate} />
      <DataTableSearch page={page} setPage={setPage} />
      <Stack>
        <Box sx={{ overflow: 'hidden' }}>
          <TableContainer sx={{ overflow: { md: 'hidden' } }}>
            <Table sx={{ minWidth: 700 }}>
              <DataTableColumns columns={columns} />
              <FeeTransactionDataRows
                handleEdit={handleEdit}
                handleConfirmDialogOpen={handleConfirmDialogOpen}
                records={feeTransactions}
                columns={columns}
              />
            </Table>
          </TableContainer>
        </Box>
        <CustomPagination
          pageIndex={page.pageIndex}
          totalPages={feeTransactions?.totalPages}
          handlePageIndex={handlePageIndex}
        />
      </Stack>
      <CustomModal
        editMode={editMode}
        title="Fee Transaction"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      >
        <FeeTransactionForm
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

export default FeeTransactionDataTable;
