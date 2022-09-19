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
// import myImage from '../../img/irshad.png';

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
                alt="Irshad Saiyed" // FIXME:
                // src="https://mui.com/static/images/avatar/2.jpg"
                src="/student3.jpg"
                sx={{ width: 50, height: 50 }}
              />
              <Stack>
                <Typography
                  sx={{ fontSize: '14px', fontWeight: '700' }}
                >{`${item.first_name} ${item.middle_name}`}</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                  {item.last_name}
                </Typography>
              </Stack>
            </Stack>
          </TableCell>
          <TableCell>
            <Stack>
              <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                {item.educational_year}
              </Typography>
              <Typography sx={{ fontSize: '12px', color: '#6c757d' }}>
                {`${item.medium} Medium`}
              </Typography>
            </Stack>
          </TableCell>
          <TableCell>
            <Stack>
              <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                {`${item.standard}-${item.division}`}
              </Typography>
              <Typography sx={{ fontSize: '12px', color: '#6c757d' }}>
                {`${item.stream} Stream`}
              </Typography>
            </Stack>
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
