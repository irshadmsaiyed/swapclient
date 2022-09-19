import * as Yup from 'yup';

// initial field values
export const defaultValues = {
  educational_year: '',
  standard: '',
  division: '',
  medium: '',
  section: '',
  stream: '',
  teacher_id: '',
};

// validation schema
export const validationSchema = Yup.object({
  educational_year: Yup.string()
    .required('Required')
    .matches(/^\d{4}([-]\d{2})$/, 'Invalid year.'),
  standard: Yup.string().required('Required'),
  division: Yup.string().required('Required'),
  medium: Yup.string().required('Required'),
  section: Yup.string().required('Required'),
  stream: Yup.string().required('Required'),
  teacher_id: Yup.string().required('Required'),
}).required();
