import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

function DataTableColumns(props) {
  const { columns } = props;
  return (
    <TableHead
      sx={{
        backgroundColor: '#343a40',
        '& .MuiTableCell-head': {
          color: 'white',
          px: 2,
        },
      }}
    >
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.headerName}>{column.headerName}</TableCell>
        ))}
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default DataTableColumns;
