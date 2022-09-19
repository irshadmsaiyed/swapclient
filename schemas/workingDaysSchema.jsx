import * as Yup from 'yup';

// initial field values
export const defaultValues = {
  educational_year: '',
  month: '',
  educational_days: '',
  teaching_days: '',
  nonteaching_days: '',
  service_days: '',
};

// validation schema
export const validationSchema = Yup.object({
  educational_year: Yup.string()
    .required('Required')
    .matches(/^\d{4}([-]\d{2})$/, 'Invalid year.'),
  // ^\d{4}$
  month: Yup.string().required('Required').matches(/^\d+$/, 'Invalid number.'),
  educational_days: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  teaching_days: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  nonteaching_days: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  service_days: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
}).required();
