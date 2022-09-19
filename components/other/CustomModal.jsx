import React from 'react';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// import PropTypes from 'prop-types';

function CustomModal(props) {
  const { editMode, children, title, isModalOpen, handleCloseModal } = props;

  return (
    <Dialog
      onClose={() => handleCloseModal()}
      open={isModalOpen}
      // maxWidth="xs"
      PaperProps={{ elevation: 5, sx: { borderRadius: 5 } }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography color="primary.main" fontWeight="600" fontSize="20px">
          {editMode ? `Update ${title}` : `Add ${title}`}
        </Typography>
        <IconButton color="error" onClick={() => handleCloseModal()}>
          <CloseRoundedIcon color="error" sx={{ fontSize: '28px' }} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ py: 1 }}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
}

// CustomModal.propTypes = {
//   openModal: PropTypes.bool.isRequired,
//   handleCloseModal: PropTypes.func.isRequired,
//   formData: PropTypes.element.isRequired,
// };

export default CustomModal;
