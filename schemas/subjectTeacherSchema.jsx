import * as Yup from 'yup';

// initial field values
export const defaultValues = {
  educational_year: '',
  classroom_id: '',
  subject_id: '',
  teacher_id: '',
};

// validation schema
export const validationSchema = Yup.object({
  educational_year: Yup.string()
    .required('Required')
    .matches(/^\d{4}([-]\d{2})$/, 'Invalid year.'),
  classroom_id: Yup.string().required('Required'),
  subject_id: Yup.string().required('Required'),
  teacher_id: Yup.string().required('Required'),
}).required();
