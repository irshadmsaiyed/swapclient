import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from '@mui/material';
import { Controller } from 'react-hook-form';

function SelectInput(props) {
  const {
    name,
    control,
    label,
    options,
    optionKey = null,
    optionValue = null,
    optionLabel = null,
  } = props;

  const generateSingleOptions = () =>
    options?.map((option) => (
      <MenuItem
        key={option[optionKey] || option[name]}
        value={option[optionValue] || option[name]}
      >
        {option[optionLabel] || option[name]}
      </MenuItem>
    ));

  return (
    <Controller
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel>{label}</InputLabel>
          <Select onChange={onChange} value={value}>
            {generateSingleOptions()}
          </Select>
          <FormHelperText>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
      control={control}
      name={name}
    />
  );
}

export default SelectInput;
