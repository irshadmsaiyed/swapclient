import * as Yup from 'yup';

// initial field values
export const defaultValues = {
  educational_year: '',
  session1_start: null,
  session1_end: null,
  session2_start: null,
  session2_end: null,
  diwali_start: null,
  diwali_end: null,
  summer_start: null,
  summer_end: null,
  other_start: null,
  other_end: null,
  other_details: '',
};

// validation schema
export const validationSchema = Yup.object({
  educational_year: Yup.string()
    .required('Required')
    .matches(/^\d{4}([-]\d{2})$/, 'Invalid year.'),
  session1_start: Yup.date().required('Required').nullable(),
  session1_end: Yup.date().required('Required').nullable(),
  session2_start: Yup.date().required('Required').nullable(),
  session2_end: Yup.date().required('Required').nullable(),
  diwali_start: Yup.date().required('Required').nullable(),
  diwali_end: Yup.date().required('Required').nullable(),
  summer_start: Yup.date().required('Required').nullable(),
  summer_end: Yup.date().required('Required').nullable(),
  other_start: Yup.date().nullable(),
  other_end: Yup.date().nullable(),
  other_details: Yup.string(),
}).required();
