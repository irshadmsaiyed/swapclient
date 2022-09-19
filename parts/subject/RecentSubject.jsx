import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Stack,
  Avatar,
  Pagination,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from '@mui/material';

import useGetPaginatedRecords from '../../hooks/useGetPaginatedRecords';
import useDeleteRecord from '../../hooks/useDeleteRecord';
import useModal from '../../hooks/useModal';
import useDialog from '../../hooks/useDialog';

import { openAlert } from '../../features/modal/modalSlice';

// custom components import
import CustomModal from '../../components/other/CustomModal';
import ConfirmDialog from '../../components/other/ConfirmDialog';
import CustomAlert from '../../components/other/CustomAlert';

import SubjectForm from './SubjectForm';
import { defaultValues } from '../../schemas/subjectSchema';

import DataTableTitle from '../../components/data-table/DataTableTitle';
import DataTableSearch from '../../components/data-table/DataTableSearch';
import MenuBookIcon from '@mui/icons-material/MenuBook';
// import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { dateFormatter } from '../../utils/helperFunctions';
import { lightGreen, green, indigo, brown, pink } from '@mui/material/colors';

export default function RecentSubject() {
  const dispatch = useDispatch();
  const [page, setPage] = useState({
    pageIndex: 1,
    pageLimit: 4,
    mainQueryKey: 'subject',
    subQueryKey: 'recent',
    searchText: '',
  });

  const [id, setId] = useState(null);

  const [editFormValues, setEditFormValues] = useState(defaultValues);
  const [editMode, setEditMode] = useState(false);

  const { data: subjects } = useGetPaginatedRecords(page, {
    keepPreviousData: true,
  });

  const { mutate: deleteSubject } = useDeleteRecord(page.mainQueryKey);
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const { isDialogOpen, handleOpenDialog, handleCloseDialog } = useDialog();

  const handleCreate = () => {
    handleOpenModal();
    setEditMode(false);
    setEditFormValues(defaultValues);
  };

  const handleEdit = (subject) => {
    setEditFormValues({ ...subject });
    setEditMode(true);
    handleOpenModal();
  };

  const handleDelete = () => {
    deleteSubject(id);
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
      <DataTableTitle title="Recent Subject" handleCreate={handleCreate} />
      <DataTableSearch page={page} setPage={setPage} />
      <Stack spacing={2} sx={{ my: 1, px: '20px' }}>
        <List>
          {subjects?.rows?.map((subject) => (
            <Stack key={subject.id} direction="row">
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant="rounded" sx={{ bgcolor: indigo[400] }}>
                    <MenuBookIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={subject.subject_name}
                  secondary={`${dateFormatter(subject.created_at)}`}
                  secondaryTypographyProps={{ fontSize: '10px' }}
                />
              </ListItem>
              {/* <IconButton
                sx={{ color: pink[400] }}
                onClick={() => handleConfirmDialogOpen(subject.id)}
              >
                <DeleteForeverRoundedIcon />
              </IconButton> */}
              <Box display="flex" alignItems="center">
                <IconButton
                  color="secondary"
                  onClick={() => handleEdit(subject)}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Box>
            </Stack>
          ))}
        </List>
      </Stack>
      <Box
        sx={{
          px: '24px',
          py: '24px',
          display: 'flex',
          justifyContent: 'center',
          // backgroundColor: '#f7f7f7',
          backgroundColor: '#f8f9fa',
        }}
      >
        <Pagination
          count={subjects?.totalPages}
          page={page.pageIndex}
          onChange={handlePageIndex}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Box>
      <CustomModal
        editMode={editMode}
        title="Subject"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      >
        <SubjectForm
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
