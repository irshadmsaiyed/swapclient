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

import VehicleForm from './VehicleForm';
import { defaultValues } from '../../schemas/vehicleSchema';

import DataTableTitle from '../../components/data-table/DataTableTitle';
import DataTableSearch from '../../components/data-table/DataTableSearch';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
// import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { teal, pink, yellow } from '@mui/material/colors';

export default function RecentVehicle() {
  const dispatch = useDispatch();
  const [page, setPage] = useState({
    pageIndex: 1,
    pageLimit: 4,
    mainQueryKey: 'vehicle',
    subQueryKey: 'recent',
    searchText: '',
  });

  const [id, setId] = useState(null);

  const [editFormValues, setEditFormValues] = useState(defaultValues);
  const [editMode, setEditMode] = useState(false);

  const { data: vehicles } = useGetPaginatedRecords(page, {
    keepPreviousData: true,
  });

  const { mutate: deleteVehicle } = useDeleteRecord(page.mainQueryKey);
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const { isDialogOpen, handleOpenDialog, handleCloseDialog } = useDialog();

  const handleCreate = () => {
    handleOpenModal();
    setEditMode(false);
    setEditFormValues(defaultValues);
  };

  const handleEdit = (vehicle) => {
    setEditFormValues({ ...vehicle });
    setEditMode(true);
    handleOpenModal();
  };

  const handleDelete = () => {
    deleteVehicle(id);
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
      <DataTableTitle title="Recent Vehicle" handleCreate={handleCreate} />
      <DataTableSearch page={page} setPage={setPage} />
      <Stack spacing={2} sx={{ my: 1, px: '20px' }}>
        <List>
          {vehicles?.rows?.map((vehicle) => (
            <Stack key={vehicle.id} direction="row">
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant="rounded" sx={{ bgcolor: teal[400] }}>
                    <DirectionsBusIcon fontSize="large" />
                  </Avatar>
                  {/* <Avatar
                    variant="rounded"
                    src="/school_bus.jpg"
                    sx={{ width: 50, height: 50, mr: 2 }}
                  /> */}
                  {/* sx={{ bgcolor: teal[400] }} */}
                  {/* <DirectionsBusRoundedIcon /> */}
                  {/* </Avatar> */}
                </ListItemAvatar>
                <ListItemText
                  primary={vehicle.registration_no}
                  secondary={`${vehicle.first_name} ${vehicle.last_name}`}
                  secondaryTypographyProps={{ fontSize: '12px' }}
                />
              </ListItem>
              {/* <IconButton
                sx={{ color: pink[400] }}
                onClick={() => handleConfirmDialogOpen(vehicle.id)}
              >
                <DeleteForeverRoundedIcon />
              </IconButton> */}
              <Box display="flex" alignItems="center">
                <IconButton
                  color="secondary"
                  onClick={() => handleEdit(vehicle)}
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
          count={vehicles?.totalPages}
          page={page.pageIndex}
          onChange={handlePageIndex}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Box>
      <CustomModal
        editMode={editMode}
        title="Vehicle"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      >
        <VehicleForm
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
