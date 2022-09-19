import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

function TextInput(props) {
  const {
    name,
    label,
    control,
    disabled = false,
    size = 'medium',
    type = 'text',
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size={size}
          error={!!error}
          yarn
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          disabled={disabled}
          type={type}
        />
      )}
    />
  );
}

export default TextInput;
