import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { indigo } from '@mui/material/colors';

// components
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../../features/user/userSlice';
import TextInput from '../../components/form-input/TextInput';
import { defaultValues, validationSchema } from '../../schemas/userSchema';
import { userLogin } from '../../services/UserService';
import { useRouter } from 'next/router';

function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, control } = methods;

  // form submit method
  const onSubmit = async (data) => {
    dispatch(loginStart());
    try {
      const user = await userLogin(data);
      dispatch(loginSuccess(user));
      if (user?.isAdmin) {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/teacher');
      }
    } catch (error) {
      dispatch(loginFailure());
    }
  };
  return (
    <Stack spacing={3}>
      <TextInput name="username" control={control} label="Username" />
      <TextInput
        name="password"
        control={control}
        label="Password"
        type="password"
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        variant="contained"
        fullWidth
        sx={{
          mt: '16px',
          bgcolor: indigo[400],
          borderColor: indigo[200],
          '&:hover': {
            bgcolor: indigo[600],
            borderColor: indigo[400],
          },
        }}
      >
        Login
      </Button>
    </Stack>
  );
}

export default LoginForm;
