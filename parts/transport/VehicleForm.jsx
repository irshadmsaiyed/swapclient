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
import { defaultValues, validationSchema } from '../../schemas/vehicleSchema';
import SelectInput from '../../components/form-input/SelectInput';
import useDistinctList from '../../hooks/useDistinctList';

function VehicleForm(props) {
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

  const { mutate: createVehicle } = useCreateRecord('vehicle', handleOpenAlert);
  const { mutate: updateVehicle } = useUpdateRecord('vehicle', handleOpenAlert);
  const { data: driversOptions } = useDistinctList('employee', 'drivers');

  // form submit method
  const onSubmit = (data) => {
    if (initialValues.id) {
      updateVehicle(data);
      handleCloseModal();
    } else {
      createVehicle(data);
      handleCloseModal();
    }
  };
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <TextInput
          name="registration_no"
          control={control}
          label="Registration No"
        />
        <DateInput
          name="registration_validity"
          control={control}
          label="Registration Validity"
        />
      </Stack>
      <Stack direction="row" mt={2} spacing={2}>
        <TextInput
          name="insurance_policyno"
          control={control}
          label="Insurance Policy No"
        />
        <DateInput
          name="insurance_validity"
          control={control}
          label="Insurance Validity"
        />
      </Stack>
      <Stack direction="row" my={2} spacing={2}>
        <TextInput name="puc_certino" control={control} label="PUC Number" />
        <DateInput name="puc_validity" control={control} label="PUC Validity" />
      </Stack>
      <SelectInput
        name="driver_id"
        control={control}
        label="Select Driver"
        options={driversOptions?.rows}
        optionKey={'driver_id'}
        optionValue={'driver_id'}
        optionLabel={'driver_name'}
      />
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

export default VehicleForm;
