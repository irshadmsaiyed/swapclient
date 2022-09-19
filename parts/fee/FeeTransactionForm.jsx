import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
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
} from '../../schemas/feeTransactionSchema';
import SelectInput from '../../components/form-input/SelectInput';
import useDistinctList from '../../hooks/useDistinctList';
import DateInput from '../../components/form-input/DateInput';
import RadioInput from '../../components/form-input/RadioInput';
import SearchIcon from '@mui/icons-material/Search';
import { feeTypeOptions, paymentModeOptions } from '../../utils/commonObjects';
import useGetRecordById from '../../hooks/useGetRecordById';

function FeeTransactionForm(props) {
  const { editFormValues = defaultValues, handleCloseModal } = props;

  const dispatch = useDispatch();

  const [initialValues] = useState(
    { ...editFormValues } || { ...defaultValues }
  );
  const [searchStudentId, setSearchStudentId] = useState(-1);

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, control, watch } = methods;

  // openAlert function
  const handleOpenAlert = (message) => {
    dispatch(
      openAlert({
        alertMessage: `${message}`,
        alertType: 'success',
      })
    );
  };

  const { mutate: createFeeTransaction } = useCreateRecord(
    'transaction',
    handleOpenAlert
  );
  const { mutate: updateFeeTransaction } = useUpdateRecord(
    'transaction',
    handleOpenAlert
  );

  const { data: educationalYearsOptions } = useDistinctList('session', 'years');
  const { data: employeesOptions } = useDistinctList('employee', 'all');
  const { data: student } = useGetRecordById('student', searchStudentId, {
    enabled: searchStudentId > 0,
    retry: false,
  });

  const watchSearchStudentId = watch('student_id');

  const handleSearch = () => {
    setSearchStudentId(watchSearchStudentId);
  };

  const paymentMode = watch('payment_mode');

  // form submit method
  const onSubmit = (data) => {
    if (initialValues.id) {
      updateFeeTransaction(data);
      handleCloseModal();
    } else {
      createFeeTransaction(data);
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
        <TextInput name="school_id" control={control} label="School Id" />
      </Stack>

      <Stack direction="row" mt={2} spacing={2}>
        <TextInput name="student_id" control={control} label="Student Id" />
        <IconButton color="info" onClick={() => handleSearch()}>
          <SearchIcon sx={{ fontSize: '28px' }} />
        </IconButton>
      </Stack>
      <Box>
        {student?.rows ? (
          <Typography fontSize="12px" ml="4px" color="primary.main">
            {`${student.rows[0].first_name} ${student.rows[0].middle_name} ${student.rows[0].last_name} | ${student.rows[0].standard}-${student.rows[0].division}(${student.rows[0].medium} medium)`}
          </Typography>
        ) : (
          <Typography fontSize="12px" ml="4px" color="error">
            No student exist with this id...
          </Typography>
        )}
      </Box>
      <Box mt={2}>
        <RadioInput
          name="fee_type"
          control={control}
          label="Fee Type"
          options={feeTypeOptions}
        />
      </Box>

      <Stack direction="row" mt={2} spacing={2}>
        <TextInput name="fee_amount" control={control} label="Fee Amount" />
        <DateInput
          name="fee_paiddate"
          control={control}
          label="Fee Paid Date"
        />
      </Stack>

      <Box mt={2}>
        <SelectInput
          name="employee_id"
          control={control}
          label="Fee Recieved By"
          options={employeesOptions?.rows}
          optionKey={'employee_id'}
          optionValue={'employee_id'}
          optionLabel={'employee_name'}
        />
      </Box>

      <Box mt={2}>
        <RadioInput
          name="payment_mode"
          control={control}
          label="Mode of Payment"
          options={paymentModeOptions}
        />
      </Box>

      {paymentMode == 'UPI' && (
        <Box mt={2}>
          <TextInput
            name="upi_refno"
            control={control}
            label="UPI Ref No"
            disabled={Boolean(paymentMode !== 'UPI')}
          />
        </Box>
      )}

      {paymentMode == 'Check' && (
        <Box mt={2}>
          <Stack direction="row" spacing={2}>
            <TextInput
              name="check_no"
              control={control}
              label="Check No"
              disabled={Boolean(paymentMode !== 'Check')}
            />
            <DateInput
              name="check_date"
              control={control}
              label="Check Date"
              disabled={Boolean(paymentMode !== 'Check')}
            />
          </Stack>
          <Stack direction="row" mt={2} spacing={2}>
            <TextInput
              name="bank_name"
              control={control}
              label="Bank Name"
              disabled={Boolean(paymentMode !== 'Check')}
            />
            <TextInput
              name="branch_name"
              control={control}
              label="Branch Name"
              disabled={Boolean(paymentMode !== 'Check')}
            />
          </Stack>
        </Box>
      )}

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

export default FeeTransactionForm;
