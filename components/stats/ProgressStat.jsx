import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Typography, Stack, Box, LinearProgress } from '@mui/material';

export default function CommonStat(props) {
  const { title, currentStat, statIcon, progressValue } = props;
  const [currentStatColor, setCurrentStatColor] = useState('primary.main');
  const [currentStatText, setCurrentStatText] = useState('In School');

  useEffect(() => {
    if (currentStat === 1) {
      setCurrentStatColor('success.light');
      setCurrentStatText('In School');
    } else if (currentStat === 0) {
      setCurrentStatColor('secondary.light');
      setCurrentStatText('Take Leave');
    } else {
      setCurrentStatColor('error.light');
      setCurrentStatText('Absent');
    }
  }, [currentStat]);

  return (
    <Stack
      justifyContent="space-between"
      bgcolor="#FFFFFF"
      borderRadius="16px"
      boxShadow="0 0.5rem 1rem rgb(0 0 0 / 15%)"
      overflow="hidden"
      maxHeight="196px"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        py="32px"
        px="32px"
      >
        <Box>
          <Typography variant="h4" color={currentStatColor}>
            {currentStatText}
          </Typography>
          <Typography
            textTransform="uppercase"
            letterSpacing="4px"
            color="#6c757d"
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Box
            borderRadius="50%"
            bgcolor="#cfe2ff"
            p={1}
            width="70px"
            height="70px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {statIcon}
          </Box>
        </Box>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px="16px"
        py="21px"
        bgcolor="#cfe2ff"
      >
        <LinearProgress
          variant="determinate"
          sx={{ width: '90%', height: '10px', borderRadius: '5px' }}
          color="primary"
          value={progressValue}
        />
        <Typography color="primary" variant="body2">
          {progressValue}%
        </Typography>
      </Stack>
    </Stack>
  );
}

// ProgressStats.propTypes = {
//   title: PropTypes.string.isRequired,
//   statIcon: PropTypes.element.isRequired,
//   currentStat: PropTypes.number.isRequired,
//   progressValue: PropTypes.number.isRequired,
// };
