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
import RadioInput from '../../components/form-input/RadioInput';
import SelectInput from '../../components/form-input/SelectInput';
import { defaultValues, validationSchema } from '../../schemas/classroomSchema';
import {
  divisionOptions,
  mediumOptions,
  classSectionOptions,
  streamOptions,
  standardOptions,
} from '../../utils/commonObjects';
import useDistinctList from '../../hooks/useDistinctList';
import SliderInput from '../../components/form-input/SliderInput';

function ClassroomForm(props) {
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

  const { mutate: createClassroom } = useCreateRecord(
    'classroom',
    handleOpenAlert
  );
  const { mutate: updateClassroom } = useUpdateRecord(
    'classroom',
    handleOpenAlert
  );

  const { data: educationalYearsOptions } = useDistinctList('session', 'years');

  const { data: teachersOptions } = useDistinctList('employee', 'teachers');

  // form submit method
  const onSubmit = (data) => {
    if (initialValues.id) {
      updateClassroom(data);
      handleCloseModal();
    } else {
      createClassroom(data);
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
          name="teacher_id"
          control={control}
          label="Class teacher"
          options={teachersOptions?.rows}
          optionKey={'teacher_id'}
          optionValue={'teacher_id'}
          optionLabel={'teacher_name'}
        />
      </Stack>
      <Box mt={2}>
        {/* <SliderInput
          name="standard"
          control={control}
          label="Standard"
          setValue={setValue}
        /> */}
        <RadioInput
          name="standard"
          control={control}
          label="Standard"
          options={standardOptions}
        />
      </Box>
      <Box mt={2}>
        <RadioInput
          name="division"
          control={control}
          label="Division"
          options={divisionOptions}
        />
      </Box>
      <Box mt={2}>
        <RadioInput
          name="medium"
          control={control}
          label="Medium"
          options={mediumOptions}
        />
      </Box>
      <Box mt={2}>
        <RadioInput
          name="section"
          control={control}
          label="Section"
          options={classSectionOptions}
        />
      </Box>
      <Box mt={2}>
        <RadioInput
          name="stream"
          control={control}
          label="Stream"
          options={streamOptions}
        />
      </Box>
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

export default ClassroomForm;
