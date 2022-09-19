import React from 'react';
import {
  Box,
  Chip,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import HourglassFullRoundedIcon from '@mui/icons-material/HourglassFullRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import { dateFormatter } from '../../utils/helperFunctions';

// import myImage from '../../img/irshad.png';

function SessionDataRows(props) {
  const { handleEdit, handleConfirmDialogOpen, records } = props;
  return (
    <TableBody
      sx={{
        '& .MuiTableCell-body': {
          fontSize: 16,
          px: 3,
        },
      }}
    >
      {records?.rows?.map((item) => (
        <TableRow
          key={item.id}
          sx={{
            '&:nth-of-type(odd)': {
              backgroundColor: '#f8f9fa',
            },
            '&:last-child td, &:last-child th': {
              border: 0,
            },
          }}
        >
          <TableCell>
            <Chip
              icon={<CalendarTodayIcon />}
              label={item.educational_year}
              color="info"
              variant="outlined"
              sx={{ p: 1 }}
            />
          </TableCell>
          <TableCell>
            <Stack spacing={1}>
              <Box display="flex">
                <HourglassFullRoundedIcon fontSize="small" />
                <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                  {dateFormatter(item.session1_start)}
                </Typography>
              </Box>
              <Box display="flex">
                <HourglassEmptyRoundedIcon fontSize="small" />
                <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                  {dateFormatter(item.session1_end)}
                </Typography>
              </Box>
            </Stack>
          </TableCell>
          <TableCell>
            <Stack spacing={1}>
              <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                {dateFormatter(item.session2_start)}
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                {dateFormatter(item.session2_end)}
              </Typography>
            </Stack>
          </TableCell>
          <TableCell>
            <Stack spacing={1}>
              <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                {dateFormatter(item.diwali_start)}
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                {dateFormatter(item.diwali_end)}
              </Typography>
            </Stack>
          </TableCell>
          <TableCell>
            <Stack spacing={1}>
              <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                {dateFormatter(item.summer_start)}
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                {dateFormatter(item.summer_end)}
              </Typography>
            </Stack>
          </TableCell>
          <TableCell>
            <IconButton color="info" onClick={() => handleEdit(item)}>
              <EditRoundedIcon sx={{ fontSize: '28px' }} />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleConfirmDialogOpen(item.id)}
            >
              <DeleteForeverRoundedIcon sx={{ fontSize: '28px' }} />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default SessionDataRows;
