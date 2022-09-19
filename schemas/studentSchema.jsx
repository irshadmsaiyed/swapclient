import * as Yup from 'yup';

// initial field values
export const defaultValues = {
  educational_year: '',
  addmission_date: null,
  school_id: '',
  standard: '',
  division: '',
  section: '',
  medium: '',
  stream: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  mother_name: '',
  address: '',
  village: '',
  taluka: '',
  district: '',
  state: '',
  pin: '',
  habitation: '',
  birth_date: null,
  birth_place: '',
  gender: '',
  religion: '',
  caste: '',
  parent_mobileno1: '',
  live_withguardian: '',
  is_orphan: '',
  cwsn_status: '',
  bus_rootno: '',
  is_repeater: '',
  livein_hostel: '',
  rte_addmission: '',
  roll_no: '',
  gr_no: '',
  aadhar_diseno: '',
  aadhar_cardno: '',
  mentor_id: '',
  birth_taluko: '',
  birth_district: '',
  birth_state: '',
  grandfather_name: '',
  father_aadharno: '',
  mother_aadharno: '',
  parent_income: '',
  parent_occupation: '',
  parent_mobileno2: '',
  parent_whatsappno: '',
  parent_email: '',
  ration_cardno: '',
  isbpl_rationcard: '',
  bank_accountno: '',
  bank_name: '',
  branch_name: '',
  ifsc_code: '',
  preschool_name: '',
  preschool_address: '',
  preschool_village: '',
  preschool_taluka: '',
  preschool_district: '',
  preschool_state: '',
  preschool_result: '',
  school_leftdate: null,
  school_leftreason: '',
  payable_schoolfee: '',
  payable_busfee: '',
  payable_hostelfee: '',
  paid_schoolfee: '',
  paid_busfee: '',
  paid_hostelfee: '',
  unpaid_schoolfee: '',
  unpaid_busfee: '',
  unpaid_hostelfee: '',
  total_payablefee: '',
  total_paidfee: '',
  total_unpaidfee: '',
  feedue_date: null,
  guardian_firstname: '',
  guardian_middlename: '',
  guardian_lastname: '',
  guardian_address: '',
  guardian_village: '',
  guardian_taluka: '',
  guardian_district: '',
  guardian_state: '',
  guardian_pin: '',
  guardian_mobileno1: '',
  guardian_mobileno2: '',
  guardian_whatsappno: '',
  guardian_landlineno: '',
  guardian_relationship: '',
  profile_image: '',
};

// validation schema
export const validationSchema = Yup.object({
  educational_year: Yup.string()
    .required('Required')
    .matches(/^\d{4}([-]\d{2})$/, 'Invalid year.'),
  addmission_date: Yup.date().required('Required').nullable(),
  school_id: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  standard: Yup.string().required('Required'),
  division: Yup.string()
    .required('Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
  section: Yup.string().required('Required'),
  medium: Yup.string()
    .required('Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
  stream: Yup.string().required('Required'),
  first_name: Yup.string()
    .required('Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
  middle_name: Yup.string()
    .required('Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
  last_name: Yup.string()
    .required('Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
  mother_name: Yup.string()
    .required('Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
  address: Yup.string().required('Required'),
  village: Yup.string()
    .required('Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
  taluka: Yup.string()
    .required('Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
  district: Yup.string()
    .required('Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
  state: Yup.string().required('Required'),
  pin: Yup.string()
    .required('Required')
    .matches(/^\d{6}$/, 'Invalid number.'),
  habitation: Yup.string()
    .required('Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
  birth_date: Yup.date().required('Required').nullable(),
  birth_place: Yup.string()
    .required('Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
  gender: Yup.string()
    .required('Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
  religion: Yup.string()
    .required('Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
  caste: Yup.string()
    .required('Required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
  parent_mobileno1: Yup.string()
    .required('Required')
    .matches(/^\d{10}$/, 'Invalid number.'),
  live_withguardian: Yup.string().required('Required'), // FIXME:
  is_orphan: Yup.string().required('Required'), // FIXME:
  cwsn_status: Yup.string().required('Required'), // FIXME:
  bus_rootno: Yup.string().required('Required'),
  is_repeater: Yup.string().required('Required'), // FIXME:
  livein_hostel: Yup.string().required('Required'), // FIXME:
  rte_addmission: Yup.string().required('Required'), // FIXME:

  // non-compulsory fields

  // roll_no: Yup.string().matches(/^\d+$/, 'Invalid number.'),
  // gr_no: Yup.string().matches(/^\d+$/, 'Invalid number.'),
  // aadhar_diseno: Yup.string(),
  // aadhar_cardno: Yup.string().matches(/^\d{12}$/, 'Invalid number.'),
  // mentor_id: Yup.string().matches(/^\d+$/, 'Invalid number.'),
  // birth_taluko: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // birth_district: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // birth_state: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // grandfather_name: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // father_aadharno: Yup.string().matches(/^\d{12}$/, 'Invalid number.'),
  // mother_aadharno: Yup.string().matches(/^\d{12}$/, 'Invalid number.'),
  // parent_income: Yup.string().matches(/^\d+$/, 'Invalid number.'),
  // parent_occupation: Yup.string(),
  // parent_mobileno2: Yup.string().matches(/^\d{10}$/, 'Invalid number.'),
  // parent_whatsappno: Yup.string().matches(/^\d{10}$/, 'Invalid number.'),
  // parent_email: Yup.string().email('Not a valid email'),
  // ration_cardno: Yup.string(),
  // isbpl_rationcard: Yup.string(), // FIXME:,
  // bank_accountno: Yup.string().matches(/^\d{6,18}$/, 'Invalid account number.'),
  // bank_name: Yup.string().matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed.'),
  // branch_name: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // ifsc_code: Yup.string().matches(
  //   /[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/,
  //   'Invalid IFSC code.'
  // ),
  // preschool_name: Yup.string(),
  // preschool_address: Yup.string(),
  // preschool_village: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // preschool_taluka: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // preschool_district: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // preschool_state: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // preschool_result: Yup.string().matches(/^\d+$/, 'Invalid number.'), // FIXME:,
  // school_leftdate: Yup.date().nullable(),
  // school_leftreason: Yup.string(),
  // payable_schoolfee: '',
  // payable_busfee: '',
  // payable_hostelfee: '',
  // paid_schoolfee: '',
  // paid_busfee: '',
  // paid_hostelfee: '',
  // unpaid_schoolfee: '',
  // unpaid_busfee: '',
  // unpaid_hostelfee: '',
  // total_payablefee: '',
  // total_paidfee: '',
  // total_unpaidfee: '',
  // feedue_date: Yup.date().nullable(),
  // guardian_firstname: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // guardian_middlename: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // guardian_lastname: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // guardian_address: Yup.string(),
  // guardian_village: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // guardian_taluka: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // guardian_district: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // guardian_state: Yup.string().matches(
  //   /^[aA-zZ\s]+$/,
  //   'Only alphabets are allowed.'
  // ),
  // guardian_pin: Yup.string().matches(/^\d{6}$/, 'Invalid number.'),
  // guardian_mobileno1: Yup.string().matches(/^\d{10}$/, 'Invalid number.'),
  // guardian_mobileno2: Yup.string().matches(/^\d{10}$/, 'Invalid number.'),
  // guardian_whatsappno: Yup.string().matches(/^\d{10}$/, 'Invalid number.'),
  // guardian_landlineno: Yup.string(),
  // guardian_relationship: Yup.string(),
});
