import * as Yup from 'yup';

// initial field values
export const defaultValues = {
  subject_name: '',
};

// validation schema
export const validationSchema = Yup.object({
  subject_name: Yup.string().required('Field is required'),
}).required();
