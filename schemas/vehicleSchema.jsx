import * as Yup from 'yup';

// initial field values
export const defaultValues = {
  registration_no: '',
  registration_validity: null,
  insurance_policyno: '',
  insurance_validity: null,
  puc_certino: '',
  puc_validity: null,
  driver_id: '',
  vehicle_image: '',
};

// validation schema
export const validationSchema = Yup.object({
  registration_no: Yup.string().required('Required'),
  registration_validity: Yup.date().required('Required').nullable(),
  insurance_policyno: Yup.string().required('Required'),
  insurance_validity: Yup.date().required('Required').nullable(),
  puc_certino: Yup.string().required('Required'),
  puc_validity: Yup.date().required('Required').nullable(),
}).required();
