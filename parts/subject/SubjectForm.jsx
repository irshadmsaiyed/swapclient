import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

// hooks & services
import useCreateRecord from '../../hooks/useCreateRecord';
import useUpdateRecord from '../../hooks/useUpdateRecord';

// components
import { openAlert } from '../../features/modal/modalSlice';
import TextInput from '../../components/form-input/TextInput';
import { defaultValues, validationSchema } from '../../schemas/subjectSchema';

function SubjectForm(props) {
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

  const { mutate: createSubject } = useCreateRecord('subject', handleOpenAlert);
  const { mutate: updateSubject } = useUpdateRecord('subject', handleOpenAlert);

  // form submit method
  const onSubmit = (data) => {
    if (initialValues.id) {
      updateSubject(data);
      handleCloseModal();
    } else {
      createSubject(data);
      handleCloseModal();
    }
  };
  return (
    <div>
      <TextInput name="subject_name" control={control} label="Subject Name" />
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

export default SubjectForm;
