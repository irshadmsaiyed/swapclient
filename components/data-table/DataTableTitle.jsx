import React from 'react';
import { Box, Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function DataTableTitle(props) {
  const { title, handleCreate = null } = props;
  return (
    <Box
      sx={{
        boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)',
        px: '24px',
        py: '24px',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="subtitle1"
        letterSpacing={2}
        fontWeight={500}
        textTransform="uppercase"
      >
        {title}
      </Typography>
      <Fab color="primary" size="small" onClick={handleCreate}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default DataTableTitle;
