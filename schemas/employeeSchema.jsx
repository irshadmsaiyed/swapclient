import * as Yup from 'yup';

// initial field values
export const defaultValues = {
  first_name: '',
  middle_name: '',
  last_name: '',
  address: '',
  city: '',
  taluka: '',
  district: '',
  pin: '',
  state: '',
  birth_date: null,
  gender: '',
  caste: '',
  religion: '',
  mobile_no1: '',
  mobile_no2: '',
  whatsapp_no: '',
  email: '',
  appointment_nature: '',
  experience_years: '',
  joining_date: null,
  educational_qualification: '',
  professional_qualification: '',
  driving_licence: '',
  appointed_section: '',
  designation: '',
  medium: '',
  appointed_subject: '',
  main_subject1: '',
  main_subject2: '',
  subsidiary_subject1: '',
  subsidiary_subject2: '',
  subsidiary_subject3: '',
  monthly_salary: '',
  sanctioned_leave: '',
  aadhar_no: '',
  pan_no: '',
  bank_account: '',
  bank_name: '',
  branch_name: '',
  ifsc_code: '',
  recruited_by: '',
  profile_image: '',
};

// validation schema
export const validationSchema = Yup.object().shape(
  {
    first_name: Yup.string()
      .required('Required')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
    middle_name: Yup.string()
      .required('Required')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
    last_name: Yup.string()
      .required('Required')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
    address: Yup.string().required('Required'),
    city: Yup.string()
      .required('Required')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
    taluka: Yup.string()
      .required('Required')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
    district: Yup.string()
      .required('Required')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
    pin: Yup.string()
      .required('Required')
      .matches(/^\d{6}$/, 'Pin number is invalid.'),
    state: Yup.string().required('Required'),
    birth_date: Yup.date().required('Required').nullable(),
    gender: Yup.string().required('Required'),
    caste: Yup.string().required('Required'),
    religion: Yup.string().required('Required'),
    mobile_no1: Yup.string()
      .required('Required')
      .matches(/^\d{10}$/, 'Mobile number is invalid.'),
    mobile_no2: Yup.string()
      .nullable()
      .notRequired()
      .when('mobile_no2', {
        is: (value) => value?.length,
        then: (rule) => rule.matches(/^\d{10}$/, 'Mobile number is invalid.'),
      }),
    whatsapp_no: Yup.string()
      .required('Required')
      .matches(/^\d{10}$/, 'Mobile number is invalid.'),
    email: Yup.string()
      .nullable()
      .notRequired()
      .when('email', {
        is: (value) => value?.length,
        then: (rule) => rule.email('Not a valid email'),
      }),
    appointment_nature: Yup.string().required('Required'),
    experience_years: Yup.string()
      .required('Required')
      .matches(/^\d+$/, 'Invalid number.'),
    joining_date: Yup.date().required('Required').nullable(),
    educational_qualification: Yup.string().required('Required'),
    professional_qualification: Yup.string().required('Required'),
    driving_licence: Yup.string()
      .nullable()
      .notRequired()
      .when('driving_licence', {
        is: (value) => value?.length,
        then: (rule) =>
          rule.matches(
            /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
            'Driving licence number is invalid'
          ),
      }),
    appointed_section: Yup.string().required('Required'),
    designation: Yup.string().required('Required'),
    medium: Yup.string().required('Required'),
    appointed_subject: Yup.string().required('Required'),
    main_subject1: Yup.string().required('Required'),
    main_subject2: Yup.string().required('Required'),
    monthly_salary: Yup.string()
      .required('Required')
      .matches(/^\d+$/, 'Invalid salary amount.'),
    sanctioned_leave: Yup.string()
      .required('Required')
      .matches(/^\d+$/, 'Invalid number.'),
    aadhar_no: Yup.string()
      .nullable()
      .notRequired()
      .when('aadhar_no', {
        is: (value) => value?.length,
        then: (rule) => rule.matches(/^\d{12}$/, 'Aadhaar number is invalid.'),
      }),
    pan_no: Yup.string()
      .nullable()
      .notRequired()
      .when('pan_no', {
        is: (value) => value?.length,
        then: (rule) =>
          rule.matches(
            /^([A-Z]){3}(C|P|H|F|A|T|B|L|J|G){1}([A-Z]){1}([0-9]){4}([A-Z]){1}?$/,
            'Invalid PAN number.'
          ),
      }),
    bank_account: Yup.string()
      .nullable()
      .notRequired()
      .when('bank_account', {
        is: (value) => value?.length,
        then: (rule) => rule.matches(/^\d{6,18}$/, 'Invalid account number.'),
      }),
    bank_name: Yup.string()
      .nullable()
      .notRequired()
      .when('bank_name', {
        is: (value) => value?.length,
        then: (rule) =>
          rule.matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
      }),
    branch_name: Yup.string()
      .nullable()
      .notRequired()
      .when('branch_name', {
        is: (value) => value?.length,
        then: (rule) =>
          rule.matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
      }),
    ifsc_code: Yup.string()
      .nullable()
      .notRequired()
      .when('ifsc_code', {
        is: (value) => value?.length,
        then: (rule) =>
          rule.matches(/[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/, 'Invalid IFSC code.'),
      }),
    recruited_by: Yup.string()
      .nullable()
      .notRequired()
      .when('recruited_by', {
        is: (value) => value?.length,
        then: (rule) =>
          rule.matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
      }),
  },
  [
    ['mobile_no2', 'mobile_no2'],
    ['email', 'email'],
    ['driving_licence', 'driving_licence'],
    ['aadhar_no', 'aadhar_no'],
    ['pan_no', 'pan_no'],
    ['bank_account', 'bank_account'],
    ['bank_name', 'bank_name'],
    ['branch_name', 'branch_name'],
    ['ifsc_code', 'ifsc_code'],
    ['recruited_by', 'recruited_by'],
  ]
);
