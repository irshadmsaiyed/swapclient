import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';

// hooks & services
import useCreateRecord from '../../hooks/useCreateRecord';
import useUpdateRecord from '../../hooks/useUpdateRecord';

// components
import { openAlert } from '../../features/modal/modalSlice';
import TextInput from '../../components/form-input/TextInput';
import {
  defaultValues,
  validationSchema,
} from '../../schemas/workingDaysSchema';
import useDistinctList from '../../hooks/useDistinctList';
import SelectInput from '../../components/form-input/SelectInput';

function WorkingDaysForm(props) {
  const { editFormValues = defaultValues, handleCloseModal } = props;

  const dispatch = useDispatch();

  const [initialValues] = useState(
    { ...editFormValues } || { ...defaultValues }
  );

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, control } = methods;

  // openAlert function
  const handleOpenAlert = (message) => {
    dispatch(
      openAlert({
        alertMessage: `${message}`,
        alertType: 'success',
      })
    );
  };

  const { mutate: createWorkingDays } = useCreateRecord(
    'workingdays',
    handleOpenAlert
  );
  const { mutate: updateWorkingDays } = useUpdateRecord(
    'workingdays',
    handleOpenAlert
  );

  const { data: educationalYearsOptions } = useDistinctList('session', 'years');

  // form submit method
  const onSubmit = (data) => {
    if (initialValues.id) {
      updateWorkingDays(data);
      handleCloseModal();
    } else {
      createWorkingDays(data);
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
        <TextInput name="month" control={control} label="Month" />
      </Stack>
      <Stack direction="row" mt={2} spacing={2}>
        <TextInput
          name="educational_days"
          control={control}
          label="Educational Days"
        />
        <TextInput
          name="teaching_days"
          control={control}
          label="Teaching Days"
        />
      </Stack>
      <Stack direction="row" mt={2} spacing={2}>
        <TextInput
          name="nonteaching_days"
          control={control}
          label="Non-teaching Days"
        />
        <TextInput name="service_days" control={control} label="Service Days" />
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

export default WorkingDaysForm;
