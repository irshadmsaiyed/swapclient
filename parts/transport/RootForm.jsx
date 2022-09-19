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
import { defaultValues, validationSchema } from '../../schemas/rootSchema';
import SelectInput from '../../components/form-input/SelectInput';
import useDistinctList from '../../hooks/useDistinctList';

function RootForm(props) {
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

  const { mutate: createRoot } = useCreateRecord('root', handleOpenAlert);
  const { mutate: updateRoot } = useUpdateRecord('root', handleOpenAlert);
  const { data: busesOptions } = useDistinctList('vehicle', 'buses');

  // form submit method
  const onSubmit = (data) => {
    if (initialValues.id) {
      updateRoot(data);
      handleCloseModal();
    } else {
      createRoot(data);
      handleCloseModal();
    }
  };
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <TextInput name="root_name" control={control} label="Root Name" />
        <TextInput name="root_rent" control={control} label="Root Rent" />
      </Stack>
      <Stack direction="row" mt={2} spacing={2}>
        <TextInput name="pickup_point" control={control} label="Pickup Point" />
        <SelectInput
          name="vehicle_id"
          control={control}
          label="Select Bus"
          options={busesOptions?.rows}
          optionKey={'vehicle_id'}
          optionValue={'vehicle_id'}
          optionLabel={'registration_no'}
        />
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

export default RootForm;
