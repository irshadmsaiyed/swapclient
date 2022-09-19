import React from 'react';
import {
  Avatar,
  Chip,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import NumbersIcon from '@mui/icons-material/Numbers';
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';
import PersonIcon from '@mui/icons-material/Person';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
// import myImage from '../../img/irshad.png';
import { indigo } from '@mui/material/colors';

function StudentDataRows(props) {
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
              // backgroundColor: (theme) => theme.palette.action.hover,
              backgroundColor: '#f8f9fa',
            },
            '&:last-child td, &:last-child th': {
              border: 0,
            },
          }}
        >
          <TableCell>
            <Chip
              icon={<NumbersIcon />}
              label={item.id}
              color="info"
              variant="outlined"
              sx={{ p: 1 }}
            />
          </TableCell>
          <TableCell>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                alt={`${item.first_name} ${item.last_name}`}
                sx={{ bgcolor: indigo[400] }}
              >
                <PhonelinkLockIcon />
              </Avatar>
              <Stack>
                <Typography
                  sx={{ fontSize: '14px', fontWeight: '700' }}
                >{`${item.first_name} ${item.last_name}`}</Typography>
                <Typography sx={{ fontSize: '12px', color: '#6c757d' }}>
                  {item.designation}
                </Typography>
              </Stack>
            </Stack>
          </TableCell>
          <TableCell>
            <Chip
              icon={<PersonIcon />}
              label={item.username}
              color="info"
              variant="filled"
              sx={{ p: 1 }}
            />
          </TableCell>
          <TableCell>
            <Chip
              icon={<KeyRoundedIcon />}
              label={item.password}
              variant="filled"
              sx={{ p: 1 }}
            />
          </TableCell>
          <TableCell>
            <IconButton color="info" onClick={() => handleEdit(item.id)}>
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

export default StudentDataRows;
