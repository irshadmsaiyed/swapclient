import React from 'react';
import {
  Chip,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

function WorkingDaysDataRows(props) {
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
          <TableCell>{item.month}</TableCell>
          <TableCell>{item.educational_days}</TableCell>
          <TableCell>{item.teaching_days}</TableCell>
          <TableCell>{item.nonteaching_days}</TableCell>
          <TableCell>{item.service_days}</TableCell>
          <TableCell>
            <IconButton color="info" onClick={() => handleEdit(item)}>
              <EditRoundedIcon sx={{ fontSize: '28px' }} />
            </IconButton>
            {/* <IconButton
              color="secondary"
              onClick={() => handleConfirmDialogOpen(item.id)}
            >
              <DeleteForeverRoundedIcon sx={{ fontSize: '28px' }} />
            </IconButton> */}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default WorkingDaysDataRows;
