import * as Yup from 'yup';

// initial field values
export const defaultValues = {
  educational_year: '',
  school_id: '',
  student_id: '',
  fee_type: '',
  fee_amount: '',
  fee_paiddate: null,
  employee_id: '',
  payment_mode: 'Cash',
  upi_refno: '',
  check_no: '',
  check_date: '',
  bank_name: '',
  branch_name: '',
};

// validation schema
export const validationSchema = Yup.object({
  educational_year: Yup.string()
    .required('Required')
    .matches(/^\d{4}([-]\d{2})$/, 'Invalid year.'),
  // ^\d{4}$
  school_id: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  student_id: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  fee_type: Yup.string().required('Required'),
  fee_amount: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  fee_paiddate: Yup.date().required('Required').nullable(),
  employee_id: Yup.string()
    .required('Required')
    .matches(/^\d+$/, 'Invalid number.'),
  payment_mode: Yup.string().required('Required'),
  upi_refno: Yup.string().when('paymentMode', {
    is: (paymentMode) => paymentMode === 'UPI',
    then: Yup.string().required('Required'),
  }),
  check_no: Yup.string().when('paymentMode', {
    is: (paymentMode) => paymentMode === 'Check',
    then: Yup.string().required('Required'),
  }),
  check_date: Yup.date().when('paymentMode', {
    is: (paymentMode) => paymentMode === 'Check',
    then: Yup.date().required('Required'),
  }),
  bank_name: Yup.string().when('paymentMode', {
    is: (paymentMode) => paymentMode === 'Check',
    then: Yup.string().required('Required'),
  }),
  branch_name: Yup.string().when('paymentMode', {
    is: (paymentMode) => paymentMode === 'Check',
    then: Yup.string().required('Required'),
  }),
});
