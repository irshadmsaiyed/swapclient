import * as Yup from 'yup';

// initial field values
export const defaultValues = {
  educational_year: '',
  standard: '',
  medium: '',
  stream: '',
  addmission_fee: '',
  enrollment_fee: '',
  semester1_fee: '',
  semester2_fee: '',
  semester3_fee: '',
  semester4_fee: '',
  tution_fee: '',
  laboratory_fee: '',
  library_fee: '',
  computer_fee: '',
  craft_fee: '',
  amenity_fee: '',
  diary_fee: '',
  hostel_fee: '',
  annual_fee: '',
};

// validation schema
export const validationSchema = Yup.object({
  educational_year: Yup.string()
    .required('Required')
    .matches(/^\d{4}([-]\d{2})$/, 'Invalid year.'),
  // ^\d{4}$
  standard: Yup.string().required('Required'),
  medium: Yup.string().required('Required'),
  stream: Yup.string().required('Required'),
  addmission_fee: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  enrollment_fee: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  semester1_fee: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  semester2_fee: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  semester3_fee: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  semester4_fee: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  tution_fee: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  laboratory_fee: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  library_fee: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  computer_fee: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  craft_fee: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  amenity_fee: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  diary_fee: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  hostel_fee: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
}).required();
