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

import RootForm from './RootForm';
import { defaultValues } from '../../schemas/rootSchema';

import DataTableTitle from '../../components/data-table/DataTableTitle';
import DataTableSearch from '../../components/data-table/DataTableSearch';
import DirectionsIcon from '@mui/icons-material/Directions';
// import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { purple, pink } from '@mui/material/colors'; // FIXME:

export default function RecentRoot() {
  const dispatch = useDispatch();
  const [page, setPage] = useState({
    pageIndex: 1,
    pageLimit: 4,
    mainQueryKey: 'root',
    subQueryKey: 'recent',
    searchText: '',
  });

  const [id, setId] = useState(null);

  const [editFormValues, setEditFormValues] = useState(defaultValues);
  const [editMode, setEditMode] = useState(false);

  const { data: roots } = useGetPaginatedRecords(page, {
    keepPreviousData: true,
  });

  const { mutate: deleteRoot } = useDeleteRecord(page.mainQueryKey);
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const { isDialogOpen, handleOpenDialog, handleCloseDialog } = useDialog();

  const handleCreate = () => {
    handleOpenModal();
    setEditMode(false);
    setEditFormValues(defaultValues);
  };

  const handleEdit = (root) => {
    setEditFormValues({ ...root });
    setEditMode(true);
    handleOpenModal();
  };

  const handleDelete = () => {
    deleteRoot(id);
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
      <DataTableTitle title="Recent Roots" handleCreate={handleCreate} />
      <DataTableSearch page={page} setPage={setPage} />
      <Stack spacing={2} sx={{ my: 1, px: '20px' }}>
        <List>
          {roots?.rows?.map((root) => (
            <Stack key={root.id} direction="row">
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant="rounded" sx={{ bgcolor: purple[400] }}>
                    <DirectionsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${root.root_name} (${root.root_rent})`}
                  secondary={`${root.registration_no} (${root.first_name} ${root.last_name})`}
                  secondaryTypographyProps={{ fontSize: '10px' }}
                />
              </ListItem>
              {/* <IconButton
                sx={{ color: pink[400] }}
                onClick={() => handleConfirmDialogOpen(root.id)}
              >
                <DeleteForeverRoundedIcon />
              </IconButton> */}
              <Box display="flex" alignItems="center">
                <IconButton color="secondary" onClick={() => handleEdit(root)}>
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
          count={roots?.totalPages}
          page={page.pageIndex}
          onChange={handlePageIndex}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Box>
      <CustomModal
        editMode={editMode}
        title="Root"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      >
        <RootForm
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
