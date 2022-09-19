import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';

import DoughnutChart from '../charts/DoughnutChart';

const legendData = [
  {
    color: 'rgb(255, 99, 132)',
    title: 'PP',
    value: 40,
  },
  {
    color: 'rgb(54, 162, 235)',
    title: 'PR',
    value: 30,
  },
  {
    color: 'rgb(255, 206, 86)',
    title: 'UP',
    value: 20,
  },
  {
    color: 'rgb(75, 192, 192)',
    title: 'SE',
    value: 15,
  },
  {
    color: 'rgb(153, 102, 255)',
    title: 'HS',
    value: 19,
  },
];

export default function DoughnutStat() {
  return (
    <Stack
      sx={{
        bgcolor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)',
          px: '24px',
          py: '24px',
        }}
      >
        <Typography
          variant="subtitle1"
          letterSpacing={3}
          fontWeight={500}
          textTransform="uppercase"
        >
          Subjects
        </Typography>
      </Box>
      {/* chart */}
      <Box sx={{ mx: 'auto', my: 2 }}>
        <DoughnutChart />
      </Box>
      <Stack sx={{ alignItems: 'center' }}>
        <Typography
          variant="subtitle1"
          letterSpacing={3}
          fontWeight={500}
          textTransform="uppercase"
          sx={{ color: '#777e89' }}
        >
          Total Subjects
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Typography variant="h4" fontWeight="600">
            84
          </Typography>
          <Box>
            <Typography
              variant="caption"
              sx={{
                borderRadius: '10px',
                bgcolor: '#264478',
                color: 'white',
                px: '10px',
                py: '4px',
              }}
            >
              Eng-42
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{
                borderRadius: '10px',
                bgcolor: '#ED7D31',
                color: 'white',
                px: '10px',
                py: '4px',
              }}
            >
              Guj-42
            </Typography>
          </Box>
        </Stack>
      </Stack>
      {/* Chart Legend */}
      <Box display="flex" justifyContent="space-evenly" m="24px">
        {legendData.map((item) => (
          <Box key={item.color} display="flex" alignItems="center">
            <CircleRoundedIcon
              sx={{
                color: `${item.color}`,
                marginRight: '4px',
                fontSize: '16px',
              }}
            />
            <Typography
              component="span"
              fontSize="16px"
              fontWeight="600"
              color="#777e89"
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
