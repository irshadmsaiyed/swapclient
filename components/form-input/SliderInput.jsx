import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Slider } from '@mui/material';
import { Controller } from 'react-hook-form';

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 11,
    label: '11',
  },
  {
    value: 12,
    label: '12',
  },
];

function SliderInput(props) {
  const { name, control, label, setValue } = props;
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    if (sliderValue) setValue(name, sliderValue);
  }, [name, setValue, sliderValue]);

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { value }, fieldState, formState }) => (
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
              dispaly: ['block', 'flex'],
              flexDirection: [null, 'row'],
              alignItems: [null, 'center'],
            }}
            // error={!!error}
          >
            <FormLabel component="legend">{label}</FormLabel>
            <Slider
              // value={sliderValue}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              size="medium"
              min={0}
              max={12}
              step={1}
              marks={marks}
              // sx={{ marginBottom: 3 }}
            />
          </FormControl>
        )}
      />
    </>
  );
}

export default SliderInput;
