import React from 'react';
// import PropTypes from 'prop-types';
import { Typography, Stack, Box, Button } from '@mui/material';

export default function CommonStat(props) {
  const { title, stats, statIcon, bgColor, color, backgroundImage } = props;
  return (
    <Stack
      sx={{
        justifyContent: 'space-between',
        bgcolor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
        overflow: 'hidden',
        // maxHeight: '196px',
      }}
    >
      <Stack direction="row">
        <Box bgcolor={bgColor} py="24px" px="16px">
          <Box
            sx={{
              borderRadius: '50%',
              color: { color },
              backgroundImage: `${backgroundImage}`,
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {statIcon}
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flex="1"
          gap={1}
        >
          <Typography variant="h5" color={color}>
            {title}
          </Typography>
          <Typography
            // variant="caption"
            sx={{
              color: '#6c757d',
              fontSize: '14px',
            }}
          >
            {stats}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}

// CommonStats.propTypes = {
//   title: PropTypes.string.isRequired,
//   stats: PropTypes.number.isRequired,
//   statIcon: PropTypes.element.isRequired,
// };
