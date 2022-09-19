import { useState } from 'react';

function useDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return {
    isDialogOpen,
    handleOpenDialog,
    handleCloseDialog,
  };
}

export default useDialog;
