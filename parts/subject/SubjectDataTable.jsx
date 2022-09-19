import React, { useState } from 'react';
import { Box, Stack, Table, TableContainer } from '@mui/material';
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
import DataTableRows from '../../components/data-table/DataTableRows';
import SubjectForm from '../subject/SubjectForm';

const initialFormEditValues = {
  id: null,
  subject_name: '',
};

const columns = [
  { headerName: '#Id', fieldName: 'id' },
  { headerName: 'Subject Name', fieldName: 'subject_name' },
  { headerName: 'Created Date', fieldName: 'created_at' },
  { headerName: 'Updated Date', fieldName: 'updated_at' },
];

function SubjectDataTable() {
  const dispatch = useDispatch();

  const [page, setPage] = useState({
    pageIndex: 1,
    pageLimit: 5,
    mainQueryKey: 'subject',
    subQueryKey: 'list',
    searchText: '',
  });

  const [id, setId] = useState(null);

  const [editFormValue, setEditFormValue] = useState(initialFormEditValues);
  const [editMode, setEditMode] = useState(false);

  const { data: subjects } = useGetPaginatedRecords(page, {
    keepPreviousData: true,
  });

  const { mutate: deleteSubject } = useDeleteRecord(page.mainQueryKey);

  const handleCreate = () => {
    dispatch(openModal());
    setEditMode(false);
    setEditFormValue(initialFormEditValues);
  };

  const handleEdit = (subject) => {
    setEditFormValue({ id: subject.id, subjectName: subject.subject_name });
    setEditMode(true);
    dispatch(openModal());
  };

  const handleDelete = () => {
    deleteSubject(id);
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
      <DataTableTitle title="Latest Subjects" handleCreate={handleCreate} />
      <DataTableSearch page={page} setPage={setPage} />
      <Stack>
        <Box sx={{ overflow: 'hidden' }}>
          <TableContainer sx={{ overflow: { md: 'hidden' } }}>
            <Table sx={{ minWidth: 700 }}>
              <DataTableColumns columns={columns} />
              <DataTableRows
                handleEdit={handleEdit}
                handleConfirmDialogOpen={handleConfirmDialogOpen}
                records={subjects}
                columns={columns}
              />
            </Table>
          </TableContainer>
        </Box>
        <CustomPagination
          pageIndex={page.pageIndex}
          totalPages={subjects?.totalPages}
          handlePageIndex={handlePageIndex}
        />
      </Stack>
      <CustomModal editMode={editMode} title="Subject">
        <SubjectForm editFormValue={editFormValue} />
      </CustomModal>
      <ConfirmDialog onDialogConfirm={handleDelete} />
      <CustomAlert />
    </Stack>
  );
}

export default SubjectDataTable;
