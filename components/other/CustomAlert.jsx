import React from 'react';
import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert } from '../../features/modal/modalSlice';

function CustomAlert() {
  const dispatch = useDispatch();
  const { isAlertOpen, alertType, alertMessage } = useSelector(
    (state) => state.modal
  );
  return (
    <MuiSnackbar
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      open={isAlertOpen}
      autoHideDuration={4000}
      onClose={() => dispatch(closeAlert())}
      sx={{ mt: 5 }}
    >
      <Alert
        onClose={() => dispatch(closeAlert())}
        severity={alertType || 'success'}
      >
        {alertMessage}
      </Alert>
    </MuiSnackbar>
  );
}

export default CustomAlert;
