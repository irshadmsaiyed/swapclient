import React from 'react';
import { Stack, Typography } from '@mui/material';

function PageTitle(props) {
  const { pageTitle, pageIcon } = props;
  return (
    <Stack direction="row" marginBottom="24px" alignItems="center" spacing={1}>
      {pageIcon}
      <Typography
        variant="h2"
        sx={{
          fontSize: '2.5rem',
          textTransform: 'uppercase',
          letterSpacing: '6px',
        }}
      >
        {pageTitle}
      </Typography>
    </Stack>
  );
}

export default PageTitle;
