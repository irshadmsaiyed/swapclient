import * as Yup from 'yup';

// initial field values
export const defaultValues = {
  root_name: '',
  root_rent: '',
  pickup_point: '',
  vehicle_id: '',
};

// validation schema
export const validationSchema = Yup.object({
  root_name: Yup.string().required('Required'),
  root_rent: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  pickup_point: Yup.string().required('Required'),
  vehicle_id: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
}).required();
