import React from 'react';
// import PropTypes from 'prop-types';
import { Typography, Stack, Box, Rating } from '@mui/material';

export default function FavouriteStdStat(props) {
  const { currentRate, currentLevel, targetLevel } = props;

  return (
    <Stack
      justifyContent="space-between"
      bgcolor="#FFFFFF"
      borderRadius="16px"
      boxShadow="0 0.5rem 1rem rgb(0 0 0 / 15%)"
      overflow="hidden"
      maxHeight="196px"
    >
      <Stack direction="row" py="32px" px="32px">
        <Stack alignItems="center" sx={{ flex: 1 }}>
          <Typography
            textTransform="uppercase"
            letterSpacing="1px"
            fontWeight="600"
            fontSize="15px"
            textAlign="center"
            color="#6c757d"
          >
            Current Level
          </Typography>
          <Typography fontWeight="600" fontSize="32px" color="error.main">
            {currentLevel}
          </Typography>
        </Stack>
        <Stack alignItems="center" sx={{ flex: 1 }}>
          <Typography
            textTransform="uppercase"
            letterSpacing="1px"
            fontWeight="600"
            fontSize="15px"
            textAlign="center"
            color="#6c757d"
          >
            Target Level
          </Typography>
          <Typography fontWeight="600" fontSize="32px" color="secondary.main">
            {targetLevel}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px="24px"
        py="11px"
        bgcolor="#cfe2ff"
      >
        <Typography
          color="primary"
          variant="body2"
          fontWeight="700"
          textTransform="uppercase"
          letterSpacing="4px"
        >
          Favourite Student
        </Typography>
        <Box display="flex" justifyContent="center">
          <Rating
            sx={{ fontSize: '35px' }}
            name="read-only"
            value={currentRate}
            readOnly
          />
        </Box>
      </Stack>
    </Stack>
  );
}

// FavoriteStats.propTypes = {
//   currentRate: PropTypes.number.isRequired,
//   currentLevel: PropTypes.string.isRequired,
//   targetLevel: PropTypes.string.isRequired,
// };
