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

import SessionForm from './SessionForm';
import { defaultValues } from '../../schemas/sessionSchema';

import DataTableTitle from '../../components/data-table/DataTableTitle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { dateFormatter } from '../../utils/helperFunctions';
import { deepPurple, pink } from '@mui/material/colors';

export default function RecentSession() {
  const dispatch = useDispatch();
  const [page, setPage] = useState({
    pageIndex: 1,
    pageLimit: 4,
    mainQueryKey: 'session',
    subQueryKey: 'recent',
  });

  const [id, setId] = useState(null);

  const [editFormValues, setEditFormValues] = useState(defaultValues);
  const [editMode, setEditMode] = useState(false);

  const { data: sessions } = useGetPaginatedRecords(page, {
    keepPreviousData: true,
  });

  const { mutate: deleteSession } = useDeleteRecord(page.mainQueryKey);
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const { isDialogOpen, handleOpenDialog, handleCloseDialog } = useDialog();

  const handleCreate = () => {
    handleOpenModal();
    setEditMode(false);
    setEditFormValues(defaultValues);
  };

  const handleEdit = (session) => {
    setEditFormValues({ ...session });
    setEditMode(true);
    handleOpenModal();
  };

  const handleDelete = () => {
    deleteSession(id);
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
      <DataTableTitle title="Recent Session" handleCreate={handleCreate} />
      <Stack spacing={2} sx={{ my: 2, px: '24px' }}>
        <List>
          {sessions?.rows?.map((session) => (
            <Stack key={session.id} direction="row">
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant="rounded" sx={{ bgcolor: deepPurple[400] }}>
                    <CalendarTodayIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={session.educational_year}
                  secondary={`${dateFormatter(
                    session.session1_start
                  )} to ${dateFormatter(session.session2_end)}`}
                  secondaryTypographyProps={{ fontSize: '10px' }}
                />
              </ListItem>
              {/* <IconButton
                sx={{ color: pink[400] }}
                onClick={() => handleConfirmDialogOpen(session.id)}
              >
                <DeleteForeverRoundedIcon />
              </IconButton> */}
              <Box display="flex" alignItems="center">
                <IconButton
                  color="secondary"
                  onClick={() => handleEdit(session)}
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
          count={sessions?.totalPages}
          page={page.pageIndex}
          onChange={handlePageIndex}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Box>
      <CustomModal
        editMode={editMode}
        title="Session"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      >
        <SessionForm
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
