import React from 'react';
import { Typography } from '@mui/material';

import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';

function Logo() {
  return (
    <>
      <SchoolRoundedIcon sx={{ marginRight: '4px', fontSize: '2.5rem' }} />
      <Typography
        noWrap
        component="div"
        sx={{
          mr: 2,
          fontWeight: '600',
          fontSize: '1.5rem',
          lineHeight: '42px',
        }}
      >
        SWAP
      </Typography>
    </>
  );
}

export default Logo;
