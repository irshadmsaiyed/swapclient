import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
// import { useDispatch, useSelector } from 'react-redux';
// import { closeCofirmDialog } from '../../features/modal/modalSlice';

function ConfirmDialog(props) {
  const { onDialogConfirm, isDialogOpen, handleCloseDialog } = props;
  // const dispatch = useDispatch();
  // const { isCofirmDialogOpen } = useSelector((state) => state.modal);

  return (
    <Dialog
      open={isDialogOpen}
      sx={{
        '& .MuiDialog-paper': { padding: 2, position: 'absolute', top: 5 },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        <IconButton
          disableRipple
          sx={{
            backgroundColor: '#ef53503b',
            color: 'error.main',
            '&:hover': {
              backgroundColor: '#ef53503b',
              cursor: 'default',
            },
            '& .MuiSvgIcon-root': {
              fontSize: '8rem',
            },
          }}
        >
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6">
          Are you sure to delete this record?
        </Typography>
        <Typography variant="subtitle2">
          You can not undo this operation
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={() => handleCloseDialog()}>No</Button>
        <Button color="secondary" onClick={onDialogConfirm}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
