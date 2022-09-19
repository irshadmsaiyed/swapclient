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
import DateInput from '../../components/form-input/DateInput';
import { defaultValues, validationSchema } from '../../schemas/sessionSchema';

function SessionForm(props) {
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

  const { mutate: createSession } = useCreateRecord('session', handleOpenAlert);
  const { mutate: updateSession } = useUpdateRecord('session', handleOpenAlert);

  // form submit method
  const onSubmit = (data) => {
    if (initialValues.id) {
      updateSession(data);
      handleCloseModal();
    } else {
      createSession(data);
      handleCloseModal();
    }
  };
  return (
    <div>
      <TextInput
        name="educational_year"
        control={control}
        label="Educational Year"
      />
      <Stack direction="row" mt={2} spacing={2}>
        <DateInput
          name="session1_start"
          control={control}
          label="Session1 Start"
        />
        <DateInput name="session1_end" control={control} label="Session1 End" />
      </Stack>
      <Stack direction="row" mt={2} spacing={2}>
        <DateInput
          name="session2_start"
          control={control}
          label="Session2 Start"
        />
        <DateInput name="session2_end" control={control} label="Session2 End" />
      </Stack>
      <Stack direction="row" mt={2} spacing={2}>
        <DateInput name="diwali_start" control={control} label="Diwali Start" />
        <DateInput name="diwali_end" control={control} label="Diwali End" />
      </Stack>
      <Stack direction="row" mt={2} spacing={2}>
        <DateInput name="summer_start" control={control} label="Summer Start" />
        <DateInput name="summer_end" control={control} label="Summer End" />
      </Stack>
      <Stack direction="row" my={2} spacing={2}>
        <DateInput name="other_start" control={control} label="Other Start" />
        <DateInput name="other_end" control={control} label="Other End" />
      </Stack>
      <TextInput name="other_details" control={control} label="Other Details" />
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

export default SessionForm;
