import React from 'react';
import { Box, Pagination, Typography } from '@mui/material';

function CustomPagination(props) {
  const { pageIndex, totalPages, handlePageIndex } = props;
  return (
    <Box
      sx={{
        px: '24px',
        py: ['12px', '24px'],
        display: 'flex',
        flexDirection: ['column', 'row'],
        gap: '8px',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
      }}
    >
      <Typography variant="subtitle1">
        Showing page {pageIndex} of {totalPages}
      </Typography>
      <Pagination
        count={totalPages}
        page={pageIndex}
        onChange={handlePageIndex}
        color="primary"
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Box>
  );
}

export default CustomPagination;
