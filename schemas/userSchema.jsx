import * as Yup from 'yup';

// initial field values
export const defaultValues = {
  username: '',
  password: '',
  usertype: 'employee',
};

// validation schema
export const validationSchema = Yup.object({
  username: Yup.string().required('Field is required'),
  password: Yup.string().required('Field is required'),
}).required();
