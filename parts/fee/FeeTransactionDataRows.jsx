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
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import BadgeIcon from '@mui/icons-material/Badge';
import NumbersIcon from '@mui/icons-material/Numbers';
import { dateFormatter } from '../../utils/helperFunctions';

function FeeTransactionDataRows(props) {
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
              icon={<NumbersIcon />}
              label={item.id}
              color="info"
              variant="outlined"
              sx={{ p: 1 }}
            />
          </TableCell>
          <TableCell>{item.educational_year}</TableCell>

          <TableCell>
            <Stack>
              <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                {`${item.first_name} ${item.middle_name} ${item.last_name} (${item.student_id})`}
              </Typography>
              <Box display="flex" alignItems="center" gap="4px">
                <BadgeIcon fontSize="small" />
                <Typography sx={{ fontSize: '14px' }}>
                  {`${item.standard}-${item.division} ${item.medium}`}
                </Typography>
              </Box>
            </Stack>
          </TableCell>

          <TableCell>{item.fee_type}</TableCell>
          <TableCell>
            <Stack>
              <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                {`${item.fee_amount}`}
              </Typography>
              <Typography sx={{ fontSize: '12px', color: '#6c757d' }}>
                {dateFormatter(item.fee_paiddate)}
              </Typography>
            </Stack>
          </TableCell>

          <TableCell>
            <Chip
              icon={<CurrencyRupeeIcon fontSize="small" />}
              label={item.payment_mode}
              color={
                item.payment_mode === 'Cash'
                  ? 'success'
                  : item.payment_mode === 'UPI'
                  ? 'info'
                  : 'secondary'
              }
              // variant="outlined"
              sx={{ p: 1 }}
            />
          </TableCell>

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

export default FeeTransactionDataRows;
