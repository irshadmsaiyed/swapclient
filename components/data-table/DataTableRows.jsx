import React from 'react';
import { IconButton, TableBody, TableCell, TableRow } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

function DataTableRows(props) {
  const { handleEdit, handleConfirmDialogOpen, records, columns } = props;
  return (
    <TableBody
      sx={{
        '& .MuiTableCell-body': {
          fontSize: 15,
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
          {columns?.map((column) => (
            <TableCell key={column.fieldName}>
              {item[`${column.fieldName}`]}
            </TableCell>
          ))}
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

export default DataTableRows;
