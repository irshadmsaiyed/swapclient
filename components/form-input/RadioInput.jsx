import React from 'react';
import {
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import { Controller } from 'react-hook-form';

function RadioInput(props) {
  const { name, control, label, options } = props;

  const generateRadioOptions = () =>
    options.map((option) => (
      <FormControlLabel
        key={option[Object.keys(option)]}
        value={option[Object.keys(option)]}
        label={option[Object.keys(option)]}
        control={
          <Radio
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: { xs: 18, sm: 18 },
              },
            }}
          />
        }
      />
    ));
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl
          component="fieldset"
          variant="outlined"
          fullWidth
          sx={{
            borderWidth: 0.5,
            borderColor: (theme) => theme.palette.grey[400],
            borderStyle: 'solid',
            borderRadius: 1,
            px: [1, 2],
            py: 0.75,
            // dispaly: ['block', 'flex'],
            // flexDirection: [null, 'row'],
            // alignItems: [null, 'center'],
          }}
          error={!!error}
        >
          <FormLabel>{label}:</FormLabel>
          <RadioGroup value={value} onChange={onChange} row>
            {generateRadioOptions()}
          </RadioGroup>
          <FormHelperText>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default RadioInput;
