/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

function DateInput(props) {
  const { name, control, label, disabled = false } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            label={label}
            inputFormat="dd/MM/yyyy"
            defaultValue={new Date()}
            {...field}
            renderInput={(params) => <TextField {...params} fullWidth />}
            disabled={disabled}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default DateInput;
