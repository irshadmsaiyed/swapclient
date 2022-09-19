import React from 'react';
// import PropTypes from 'prop-types';
import { Typography, Stack, Box, Button } from '@mui/material';

export default function CommonStat(props) {
  const { title, stats, statIcon } = props;
  return (
    <Stack
      sx={{
        justifyContent: 'space-between',
        bgcolor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
        overflow: 'hidden',
        maxHeight: '196px',
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          p: '32px',
        }}
      >
        <Box>
          <Typography variant="h4" color="primary">
            {stats}
          </Typography>
          <Typography
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '4px',
              color: '#6c757d',
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              borderRadius: '50%',
              bgcolor: '#cfe2ff',
              p: 1,
              width: '70px',
              height: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {statIcon}
          </Box>
        </Box>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px="32px"
        py="16px"
        bgcolor="#cfe2ff"
      >
        <Typography color="primary" variant="body2">
          06 june - 12 june (2022)
        </Typography>
        <Button variant="outlined" size="small">
          View all
        </Button>
      </Stack>
    </Stack>
  );
}

// CommonStats.propTypes = {
//   title: PropTypes.string.isRequired,
//   stats: PropTypes.number.isRequired,
//   statIcon: PropTypes.element.isRequired,
// };
