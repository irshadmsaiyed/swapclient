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
import SubjectTeacherDataRows from './SubjectTeacherDataRows';
import SubjectTeacherForm from './SubjectTeacherForm';
import { defaultValues } from '../../schemas/subjectTeacherSchema';

const columns = [
  { headerName: 'Year', fieldName: '1' },
  { headerName: 'Standard', fieldName: '2' },
  { headerName: 'Stream', fieldName: '3' },
  { headerName: 'Subject', fieldName: '4' },
  { headerName: 'Teacher', fieldName: '5' },
];

function SubjectTeacherDataTable() {
  const dispatch = useDispatch();

  const [page, setPage] = useState({
    pageIndex: 1,
    pageLimit: 5,
    mainQueryKey: 'subjectteacher',
    subQueryKey: 'list',
    searchText: '',
  });

  const [id, setId] = useState(null);

  const [editFormValues, setEditFormValues] = useState(defaultValues);
  const [editMode, setEditMode] = useState(false);

  const { data: subjectTeachers } = useGetPaginatedRecords(page, {
    keepPreviousData: true,
  });

  const { mutate: deleteSubjectTeacher } = useDeleteRecord(page.mainQueryKey);
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const { isDialogOpen, handleOpenDialog, handleCloseDialog } = useDialog();

  const handleCreate = () => {
    handleOpenModal();
    setEditMode(false);
    setEditFormValues(defaultValues);
  };

  const handleEdit = (subjectTeacherData) => {
    setEditFormValues({ ...subjectTeacherData });
    setEditMode(true);
    handleOpenModal();
  };

  const handleDelete = () => {
    deleteSubjectTeacher(id);
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
      <DataTableTitle title="Subject Teachers" handleCreate={handleCreate} />
      <DataTableSearch page={page} setPage={setPage} />
      <Stack>
        <Box sx={{ overflow: 'hidden' }}>
          <TableContainer sx={{ overflow: { md: 'hidden' } }}>
            <Table sx={{ minWidth: 700 }}>
              <DataTableColumns columns={columns} />
              <SubjectTeacherDataRows
                handleEdit={handleEdit}
                handleConfirmDialogOpen={handleConfirmDialogOpen}
                records={subjectTeachers}
                columns={columns}
              />
            </Table>
          </TableContainer>
        </Box>
        <CustomPagination
          pageIndex={page.pageIndex}
          totalPages={subjectTeachers?.totalPages}
          handlePageIndex={handlePageIndex}
        />
      </Stack>
      <CustomModal
        editMode={editMode}
        title="Subject Teacher"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      >
        <SubjectTeacherForm
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

export default SubjectTeacherDataTable;
