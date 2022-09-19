import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';

// hooks & services
import useCreateRecord from '../../hooks/useCreateRecord';
import useUpdateRecord from '../../hooks/useUpdateRecord';

// components
import { openAlert } from '../../features/modal/modalSlice';
import SelectInput from '../../components/form-input/SelectInput';
import {
  defaultValues,
  validationSchema,
} from '../../schemas/subjectTeacherSchema';

import useDistinctList from '../../hooks/useDistinctList';

function SubjectTeacherForm(props) {
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

  const { data: educationalYearsOptions } = useDistinctList('session', 'years');
  const { data: classesOptions } = useDistinctList('classroom', 'classes');
  const { data: subjectsOptions } = useDistinctList('subject', 'distinct');
  const { data: teachersOptions } = useDistinctList('employee', 'teachers');

  // openAlert function
  const handleOpenAlert = (message) => {
    dispatch(
      openAlert({
        alertMessage: `${message}`,
        alertType: 'success',
      })
    );
  };

  const { mutate: createSubjectTeacher } = useCreateRecord(
    'subjectteacher',
    handleOpenAlert
  );
  const { mutate: updateSubjectTeacher } = useUpdateRecord(
    'subjectteacher',
    handleOpenAlert
  );

  // form submit method
  const onSubmit = (data) => {
    const { id, educational_year, classroom_id, subject_id, teacher_id } = data;
    const values = { educational_year, classroom_id, subject_id, teacher_id };
    const updatedValues = {
      id,
      ...values,
    };

    if (Boolean(initialValues.id)) {
      updateSubjectTeacher(updatedValues);
      handleCloseModal();
    } else {
      createSubjectTeacher(values);
      handleCloseModal();
    }
  };
  return (
    <Box minWidth="300px">
      <Box>
        <SelectInput
          name="educational_year"
          control={control}
          label="Educational Year"
          options={educationalYearsOptions?.rows}
        />
      </Box>
      <Box mt={2}>
        <SelectInput
          name="classroom_id"
          control={control}
          label="Standard Division"
          options={classesOptions?.rows}
          optionKey={'classroom_id'}
          optionValue={'classroom_id'}
          optionLabel={'class'}
        />
      </Box>
      <Box mt={2}>
        <SelectInput
          name="subject_id"
          control={control}
          label="Subject"
          options={subjectsOptions?.rows}
          optionKey={'subject_id'}
          optionValue={'subject_id'}
          optionLabel={'subject_name'}
        />
      </Box>
      <Box mt={2}>
        <SelectInput
          name="teacher_id"
          control={control}
          label="Subject teacher"
          options={teachersOptions?.rows}
          optionKey={'teacher_id'}
          optionValue={'teacher_id'}
          optionLabel={'teacher_name'}
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
    </Box>
  );
}

export default SubjectTeacherForm;
