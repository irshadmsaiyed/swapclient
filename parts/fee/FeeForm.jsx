import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';

// hooks & services
import useCreateRecord from '../../hooks/useCreateRecord';
import useUpdateRecord from '../../hooks/useUpdateRecord';

// components
import { openAlert } from '../../features/modal/modalSlice';
import TextInput from '../../components/form-input/TextInput';
import { defaultValues, validationSchema } from '../../schemas/feeSchema';
import SelectInput from '../../components/form-input/SelectInput';
import useDistinctList from '../../hooks/useDistinctList';
import SliderInput from '../../components/form-input/SliderInput';
import { mediumOptions, streamOptions } from '../../utils/commonObjects';

function FeeForm(props) {
  const { editFormValues = defaultValues, handleCloseModal } = props;

  const dispatch = useDispatch();

  const [initialValues] = useState(
    { ...editFormValues } || { ...defaultValues }
  );

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, control, setValue } = methods;

  // openAlert function
  const handleOpenAlert = (message) => {
    dispatch(
      openAlert({
        alertMessage: `${message}`,
        alertType: 'success',
      })
    );
  };

  const { mutate: createFee } = useCreateRecord('fee', handleOpenAlert);
  const { mutate: updateFee } = useUpdateRecord('fee', handleOpenAlert);

  const { data: educationalYearsOptions } = useDistinctList('session', 'years');

  // form submit method
  const onSubmit = (data) => {
    if (initialValues.id) {
      updateFee(data);
      handleCloseModal();
    } else {
      createFee(data);
      handleCloseModal();
    }
  };
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <SelectInput
          name="educational_year"
          control={control}
          label="Educational Year"
          options={educationalYearsOptions?.rows}
        />
        <SelectInput
          name="medium"
          control={control}
          label="Medium"
          options={mediumOptions}
        />
        <SelectInput
          name="stream"
          control={control}
          label="Stream"
          options={streamOptions}
        />
      </Stack>

      <Box mt={2}>
        <SliderInput
          name="standard"
          control={control}
          label="Standard"
          setValue={setValue}
        />
      </Box>

      <Stack direction="row" mt={2} spacing={2}>
        <TextInput name="addmission_fee" control={control} label="Addmission" />
        <TextInput name="enrollment_fee" control={control} label="Enrollment" />
        <TextInput name="craft_fee" control={control} label="Craft" />
        <TextInput name="amenity_fee" control={control} label="Amenity" />
      </Stack>

      <Stack direction="row" mt={2} spacing={2}>
        <TextInput name="semester1_fee" control={control} label="Semester-1" />
        <TextInput name="semester2_fee" control={control} label="Semester-2" />
        <TextInput name="semester3_fee" control={control} label="Semester-3" />
        <TextInput name="semester4_fee" control={control} label="Semester-4" />
      </Stack>

      <Stack direction="row" mt={2} spacing={2}>
        <TextInput name="tution_fee" control={control} label="Tution" />
        <TextInput name="laboratory_fee" control={control} label="Laboratory" />
        <TextInput name="library_fee" control={control} label="Library" />
        <TextInput name="computer_fee" control={control} label="Computer" />
      </Stack>

      <Stack direction="row" mt={2} spacing={2}>
        <TextInput name="diary_fee" control={control} label="Diary" />
        <TextInput name="hostel_fee" control={control} label="Hostel" />
        <TextInput name="annual_fee" control={control} label="Annual" />
      </Stack>
      <Button
        onClick={handleSubmit(onSubmit)}
        variant="contained"
        fullWidth
        sx={{ mt: '16px' }}
      >
        Save Record
      </Button>
    </div>
  );
}

export default FeeForm;
