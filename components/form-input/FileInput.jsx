/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Input, InputLabel } from '@mui/material';

function FileInput(props) {
  const { register, id, inputProps, children } = props;

  return (
    <InputLabel htmlFor={id}>
      <Input
        type="file"
        {...register}
        id={id}
        inputProps={inputProps}
        sx={{ display: 'none' }}
      />
      {children}
    </InputLabel>
  );
}

export default FileInput;
