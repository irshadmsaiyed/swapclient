import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import WallpaperRoundedIcon from '@mui/icons-material/WallpaperRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded';
import FamilyRestroomRoundedIcon from '@mui/icons-material/FamilyRestroomRounded';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import { useDispatch, useSelector } from 'react-redux';

import { openAlert } from '../../features/modal/modalSlice';
import CustomAlert from '../../components/other/CustomAlert';

import TextInput from '../../components/form-input/TextInput';
import SelectInput from '../../components/form-input/SelectInput';
import DateInput from '../../components/form-input/DateInput';
import FileInput from '../../components/form-input/FileInput';
import Image from 'next/image';

import useCreateRecord from '../../hooks/useCreateRecord';
import useUpdateRecord from '../../hooks/useUpdateRecord';
import useDistinctList from '../../hooks/useDistinctList';
import { defaultValues, validationSchema } from '../../schemas/studentSchema';

import {
  districtOptions,
  stateOptions,
  genderOptions,
  casteOptions,
  religionOptions,
  schoolOptions,
  booleanOptions,
  standardOptions,
  divisionOptions,
  classSectionOptions,
  streamOptions,
  cwsnOptions,
  habitationOptions,
  // busRootOptions,
  relationshipOptions,
  mediumOptions,
} from '../../utils/commonObjects';

function StudentForm({ data = defaultValues }) {
  const dispatch = useDispatch();
  const isAdmin =
    useSelector((state) => state?.user?.currentUser?.isAdmin) || false;
  const router = useRouter();

  const hasId = data?.id ? true : false;

  const methods = useForm({
    defaultValues: data,
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, control, reset, register } = methods;

  // openAlert function
  const handleOpenAlert = (message) => {
    dispatch(
      openAlert({
        alertMessage: `${message}`,
        alertType: 'success',
      })
    );
  };

  const { mutate: createStudent } = useCreateRecord('student', handleOpenAlert);
  const { mutate: updateStudent } = useUpdateRecord('student', handleOpenAlert);

  const { data: educationalYearsOptions } = useDistinctList('session', 'years');
  const { data: busRootOptions } = useDistinctList('root', 'busroots');
  const { data: teachersOptions } = useDistinctList('employee', 'teachers');

  useEffect(() => {
    reset({ ...data });
  }, [data, reset]);

  // form submit method
  const onSubmit = (data) => {
    const { profile_image, ...restData } = data;
    const formData = { profile_image: data.profile_image, ...restData };

    if (hasId) {
      updateStudent(formData);
    } else {
      createStudent(formData);
    }
    if (isAdmin) {
      router.push('/student');
    } else {
      router.push('/dashboard/teacher');
    }
  };

  const handleProfilePreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      const previewImage = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setInitialValues({ ...initialValues, profile_image: x.target.result });
      };
      reader.readAsDataURL(previewImage);
    }
  };

  return (
    // <Container maxWidth="false">
    //   <Box sx={{ px: { xs: '8px', sm: '24px' }, py: '40px' }}>
    <Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: '2.5rem',
          textTransform: 'uppercase',
          letterSpacing: '6px',
          marginBottom: '24px',
        }}
      >
        Student
      </Typography>
      <Grid container columnSpacing={4} rowSpacing={3}>
        <Grid item xs={12} md={3}>
          {/* upload profile image */}
          <Box
            sx={{
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
            }}
          >
            <Box
              sx={{
                height: '9rem',
                // FIXME:
                // backgroundImage: `url(
                //   'https://bubbly-react-6h3szj2hy-ondrej-svestka.vercel.app/img/photos/paul-morris-116514-unsplash.jpg'
                // )`,
                // backgroundImage: `url(${backgroundImage})`,
                backgroundImage: 'url(/sb4.jpg)',
                backgroundPosition: '50%',
                backgroundSize: 'cover',
              }}
            />
            <Box
              sx={{
                width: '130px',
                height: '130px',
                border: '3px solid white',
                zIndex: '2',
                marginTop: '-65px',
                mx: 'auto',
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              <Image
                // FIXME:
                // src={initialValues.profileImage || myImage}
                src="/student4.png"
                alt=""
                width="130px"
                height="130px"
              />
            </Box>
            <Box
              sx={{
                mt: '8px',
                px: 2,
                py: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h5"
                fontWeight="700"
                sx={{ color: '#343a40', mb: '8px' }}
              >
                {hasId ? `${data.firstName} ${data.lastName}` : 'Student Name'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CloudUploadRoundedIcon />
                <Typography variant="h6">Upload image here</Typography>
              </Box>
            </Box>
            <Stack
              direction="row"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                px: 4,
                py: 1,
                mb: '16px',
              }}
            >
              <Button
                variant="outlined"
                size="small"
                startIcon={<WallpaperRoundedIcon />}
              >
                Family
              </Button>
              <FileInput
                id="profile-image"
                inputProps={{ accept: 'image/*' }}
                register={{
                  ...register('profile_image', {
                    onChange: (e) => handleProfilePreview(e),
                  }),
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AccountCircleRoundedIcon />}
                  component="span"
                >
                  Student
                </Button>
              </FileInput>
            </Stack>
          </Box>

          {/* ==========> left side */}
          <Accordion
            sx={{
              borderRadius: '0px',
              mt: 3,
              boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
            }}
          >
            <AccordionSummary expandIcon={<ExpandCircleDownRoundedIcon />}>
              <FamilyRestroomRoundedIcon color="secondary" />
              <Typography ml={1} fontWeight={600}>
                Parents Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack gap={2} sx={{ px: 1 }}>
                <TextInput
                  name="parent_occupation"
                  control={control}
                  label="Parent Occupation"
                />
                <TextInput
                  name="parent_income"
                  control={control}
                  label="Parent Income"
                />
                <TextInput
                  name="parent_mobileno2"
                  control={control}
                  label="Parent Mobile No-2"
                />
                <TextInput
                  name="parent_whatsappno"
                  control={control}
                  label="Parent Whatsapp No"
                />
                <TextInput
                  name="parent_email"
                  control={control}
                  label="Parent Email Address"
                />
                <TextInput
                  name="father_aadharno"
                  control={control}
                  label="Father Aadharcard No"
                />
                <TextInput
                  name="mother_aadharno"
                  control={control}
                  label="Mother Aadharcard No"
                />
                <TextInput
                  name="grandfather_name"
                  control={control}
                  label="Grandfather Name"
                />
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              borderRadius: '0px',
              mt: 0,
              boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
            }}
          >
            <AccordionSummary expandIcon={<ExpandCircleDownRoundedIcon />}>
              <AccountBalanceRoundedIcon color="warning" />
              <Typography ml={1} fontWeight={600}>
                Previous School Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack gap={2} sx={{ px: 1 }}>
                <TextInput
                  name="preschool_name"
                  control={control}
                  label="Previous School Name"
                />
                <TextInput
                  name="preschool_address"
                  control={control}
                  label="School Address"
                />
                <TextInput
                  name="preschool_village"
                  control={control}
                  label="Village"
                />
                <TextInput
                  name="preschool_taluka"
                  control={control}
                  label="Taluka"
                />
                <SelectInput
                  name="preschool_district"
                  control={control}
                  label="District"
                  optionKey="district"
                  optionValue="district"
                  optionLabel="district"
                  options={districtOptions}
                />
                <SelectInput
                  name="preschool_state"
                  control={control}
                  label="State"
                  optionKey="state"
                  optionValue="state"
                  optionLabel="state"
                  options={stateOptions}
                />
                <TextInput
                  name="preschool_result"
                  control={control}
                  label="Result(%)"
                />
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              borderRadius: '0px',
              mt: 0,
              boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
            }}
          >
            <AccordionSummary expandIcon={<ExpandCircleDownRoundedIcon />}>
              <VolunteerActivismRoundedIcon color="info" />
              <Typography ml={1} fontWeight={600}>
                Guardian Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack gap={2} sx={{ px: 1 }}>
                <TextInput
                  name="guardian_firstname"
                  control={control}
                  label="First Name"
                />
                <TextInput
                  name="guardian_middlename"
                  control={control}
                  label="Middle Name"
                />
                <TextInput
                  name="guardian_lastname"
                  control={control}
                  label="Last Name"
                />
                <TextInput
                  name="guardian_address"
                  control={control}
                  label="Address"
                />
                <TextInput
                  name="guardian_village"
                  control={control}
                  label="Village"
                />
                <TextInput
                  name="guardian_taluka"
                  control={control}
                  label="Taluka"
                />
                <SelectInput
                  name="guardian_district"
                  control={control}
                  label="District"
                  optionKey="district"
                  optionValue="district"
                  optionLabel="district"
                  options={districtOptions}
                />
                <SelectInput
                  name="guardian_state"
                  control={control}
                  label="State"
                  optionKey="state"
                  optionValue="state"
                  optionLabel="state"
                  options={stateOptions}
                />
                <TextInput
                  name="guardian_pin"
                  control={control}
                  label="Pin No"
                />
                <TextInput
                  name="guardian_mobileno1"
                  control={control}
                  label="Mobile No-1"
                />
                <TextInput
                  name="guardian_mobileno2"
                  control={control}
                  label="Mobile No-2"
                />
                <TextInput
                  name="guardian_whatsappno"
                  control={control}
                  label="Whatsapp No-2"
                />
                <TextInput
                  name="guardian_landlineno"
                  control={control}
                  label="Landline No"
                />
                <SelectInput
                  name="guardian_relationship"
                  control={control}
                  label="Relationship"
                  options={relationshipOptions}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Stack
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
              overflow: 'hidden',
              mt: 3,
            }}
          >
            <Box
              sx={{
                boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)',
                px: '24px',
                py: '24px',
                display: 'flex',
                gap: 1,
              }}
            >
              <CurrencyRupeeRoundedIcon />
              <Typography
                variant="subtitle1"
                letterSpacing={2}
                fontWeight={500}
                textTransform="uppercase"
              >
                Fee Details
              </Typography>
            </Box>
            <Stack gap={2} sx={{ my: '16px', px: '16px' }}>
              <Stack direction="row" gap={6} px={5}>
                <Typography color="primary.main" fontWeight={600}>
                  Payable
                </Typography>
                <Typography color="success.main" fontWeight={600}>
                  Paid
                </Typography>
                <Typography color="error.main" fontWeight={600}>
                  Unpaid
                </Typography>
              </Stack>
              <Stack direction="row" gap={1}>
                <SchoolRoundedIcon color="info" />
                <TextInput
                  name="payable_schoolfee"
                  control={control}
                  label="payable"
                  disabled={true}
                  size="small"
                />
                <TextInput
                  name="paid_schoolfee"
                  control={control}
                  label="paid"
                  disabled={true}
                  size="small"
                />
                <TextInput
                  name="unpaid_schoolfee"
                  control={control}
                  label="unpaid"
                  disabled={true}
                  size="small"
                />
              </Stack>
              <Stack direction="row" gap={1}>
                <DirectionsBusRoundedIcon color="warning" />
                <TextInput
                  name="payable_busfee"
                  control={control}
                  label="payable"
                  disabled={true}
                  size="small"
                />
                <TextInput
                  name="paid_busfee"
                  control={control}
                  label="paid"
                  disabled={true}
                  size="small"
                />
                <TextInput
                  name="unpaid_busfee"
                  control={control}
                  label="unpaid"
                  disabled={true}
                  size="small"
                />
              </Stack>
              <Stack direction="row" gap={1}>
                <AddBusinessRoundedIcon color="secondary" />
                <TextInput
                  name="payable_hostelfee"
                  control={control}
                  label="payable"
                  disabled={true}
                  size="small"
                />
                <TextInput
                  name="paid_hostelfee"
                  control={control}
                  label="paid"
                  disabled={true}
                  size="small"
                />
                <TextInput
                  name="unpaid_hostelfee"
                  control={control}
                  label="unpaid"
                  disabled={true}
                  size="small"
                />
              </Stack>
              <Divider />
              <Stack direction="row" gap={1}>
                <CalculateRoundedIcon color="success" />
                <TextInput
                  name="total_payablefee"
                  control={control}
                  label="payable"
                  disabled={true}
                  size="small"
                />
                <TextInput
                  name="total_paidfee"
                  control={control}
                  label="paid"
                  disabled={true}
                  size="small"
                />
                <TextInput
                  name="total_unpaidfee"
                  control={control}
                  label="unpaid"
                  disabled={true}
                  size="small"
                />
              </Stack>
              <Stack direction="row" gap={1}>
                <DateRangeRoundedIcon color="error" />
                <DateInput
                  name="feedue_date"
                  control={control}
                  label="Next Fee Due Date"
                />
              </Stack>
            </Stack>
          </Stack>
        </Grid>

        {/* ============================>right side grid */}
        <Grid item xs={12} md={9}>
          {/* basic details */}
          <Stack
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)',
                px: '24px',
                py: '24px',
                display: 'flex',
                gap: 1,
              }}
            >
              <ContactMailRoundedIcon />
              <Typography
                variant="subtitle1"
                letterSpacing={2}
                fontWeight={500}
                textTransform="uppercase"
              >
                Personal Details
              </Typography>
            </Box>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={2}
              sx={{ mt: '20px', px: '24px' }}
            >
              <SelectInput
                name="school_id"
                control={control}
                label="Select School"
                optionKey="school_id"
                optionValue="school_id"
                optionLabel="name"
                options={schoolOptions}
              />
              <SelectInput
                name="educational_year"
                control={control}
                label="Educational Year"
                options={educationalYearsOptions?.rows}
              />
              <DateInput
                name="addmission_date"
                control={control}
                label="Addmission Date"
              />
              <SelectInput
                name="is_repeater"
                control={control}
                label="Repeater Student?"
                optionKey="id"
                optionValue="value"
                optionLabel="label"
                options={booleanOptions}
              />
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={2}
              sx={{ mt: '20px', px: '24px' }}
            >
              <SelectInput
                name="standard"
                control={control}
                label="Standard"
                options={standardOptions}
              />
              <SelectInput
                name="division"
                control={control}
                label="Division"
                options={divisionOptions}
              />
              <SelectInput
                name="medium"
                control={control}
                label="Medium"
                options={mediumOptions}
              />
              <SelectInput
                name="section"
                control={control}
                label="Section"
                options={classSectionOptions}
              />
              <SelectInput
                name="stream"
                control={control}
                label="Stream"
                options={streamOptions}
              />
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={2}
              sx={{ mt: '20px', px: '24px' }}
            >
              <TextInput
                name="first_name"
                control={control}
                label="First Name"
              />
              <TextInput
                name="middle_name"
                control={control}
                label="Middle Name"
              />
              <TextInput name="last_name" control={control} label="Last Name" />
              <TextInput
                name="mother_name"
                control={control}
                label="Mother Name"
              />
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={2}
              sx={{ mt: '20px', px: '24px' }}
            >
              <SelectInput
                name="religion"
                control={control}
                label="Religion"
                options={religionOptions}
              />
              <SelectInput
                name="caste"
                control={control}
                label="Caste"
                options={casteOptions}
              />
              <SelectInput
                name="gender"
                control={control}
                label="Gender"
                options={genderOptions}
              />
              <DateInput
                name="birth_date"
                control={control}
                label="Birth-Date"
              />
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={2}
              sx={{ my: '20px', px: '24px' }}
            >
              <SelectInput
                name="cwsn_status"
                control={control}
                label="CWSN Status"
                optionKey="id"
                optionValue="id"
                optionLabel="value"
                options={cwsnOptions}
              />
              <SelectInput
                name="is_orphan"
                control={control}
                label="Is Orphan?"
                optionKey="id"
                optionValue="value"
                optionLabel="label"
                options={booleanOptions}
              />
              <SelectInput
                name="rte_addmission"
                control={control}
                label="RTE Addmission?"
                optionKey="id"
                optionValue="value"
                optionLabel="label"
                options={booleanOptions}
              />
              <TextInput
                name="birth_place"
                control={control}
                label="Birth Place"
              />
            </Stack>
          </Stack>

          {/* contact details */}
          <Stack
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
              overflow: 'hidden',
              mt: 3,
            }}
          >
            <Box
              sx={{
                boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)',
                px: '24px',
                py: '24px',
                display: 'flex',
                gap: 1,
              }}
            >
              <PhoneAndroidRoundedIcon />
              <Typography
                variant="subtitle1"
                letterSpacing={2}
                fontWeight={500}
                textTransform="uppercase"
              >
                Contact Details
              </Typography>
            </Box>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={2}
              sx={{ mt: '20px', px: '24px' }}
            >
              <Box sx={{ flex: 2 }}>
                <TextInput
                  name="address"
                  control={control}
                  label="Address (Street name, Apartment name, Flat no., Area name, etc.)"
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextInput
                  name="village"
                  control={control}
                  label="Village/Town/City"
                />
              </Box>
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={2}
              sx={{ mt: '20px', px: '24px' }}
            >
              <TextInput name="taluka" control={control} label="Taluka" />
              <SelectInput
                name="district"
                control={control}
                label="District"
                options={districtOptions}
              />
              <SelectInput
                name="state"
                control={control}
                label="State"
                options={stateOptions}
              />
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={2}
              sx={{ mt: '20px', px: '24px' }}
            >
              <TextInput name="pin" control={control} label="Pin Code" />
              <SelectInput
                name="habitation"
                control={control}
                label="Habitation"
                optionKey="id"
                optionValue="value"
                optionLabel="value"
                options={habitationOptions}
              />
              <TextInput
                name="parent_mobileno1"
                control={control}
                label="Parent Mobile No"
              />
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={2}
              sx={{ my: '20px', px: '24px' }}
            >
              <DirectionsBusRoundedIcon color="info" />
              <SelectInput
                name="bus_rootno"
                control={control}
                label="Bus Root No"
                optionKey="busroot_id"
                optionValue="busroot_id"
                optionLabel="root_name"
                options={busRootOptions?.rows}
              />
              <AddBusinessRoundedIcon color="warning" />
              <SelectInput
                name="livein_hostel"
                control={control}
                label="Live in Hostel?"
                optionKey="id"
                optionValue="value"
                optionLabel="label"
                options={booleanOptions}
              />
              <FamilyRestroomRoundedIcon color="secondary" />
              <SelectInput
                name="live_withguardian"
                control={control}
                label="Live with Guardian?"
                optionKey="id"
                optionValue="value"
                optionLabel="label"
                options={booleanOptions}
              />
            </Stack>
          </Stack>

          {/* academic details */}
          <Stack
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
              overflow: 'hidden',
              mt: 3,
            }}
          >
            <Box
              sx={{
                boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)',
                px: '24px',
                py: '24px',
                display: 'flex',
                gap: 1,
              }}
            >
              <SchoolRoundedIcon />
              <Typography
                variant="subtitle1"
                letterSpacing={2}
                fontWeight={500}
                textTransform="uppercase"
              >
                Academic & Bank Details
              </Typography>
            </Box>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={2}
              sx={{ mt: '20px', px: '24px' }}
            >
              <TextInput name="roll_no" control={control} label="Roll No" />
              <TextInput name="gr_no" control={control} label="GR No" />
              <TextInput
                name="aadhar_diseno"
                control={control}
                label="Aadhar Dise No"
              />
              <SelectInput
                name="mentor_id"
                control={control}
                label="Mentor Teacher"
                options={teachersOptions?.rows}
                optionKey={'teacher_id'}
                optionValue={'teacher_id'}
                optionLabel={'teacher_name'}
              />
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={2}
              sx={{ mt: '20px', px: '24px' }}
            >
              <Box sx={{ flex: 2 }}>
                <TextInput
                  name="bank_name"
                  control={control}
                  label="Bank Name"
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextInput
                  name="branch_name"
                  control={control}
                  label="Branch Name"
                />
              </Box>
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={2}
              sx={{ mt: '20px', px: '24px' }}
            >
              <TextInput
                name="bank_accountno"
                control={control}
                label="Account No"
              />
              <TextInput name="ifsc_code" control={control} label="IFSC Code" />
              <TextInput
                name="aadhar_cardno"
                control={control}
                label="Aadhar Card No"
              />
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={2}
              sx={{ my: '20px', px: '24px' }}
            >
              <TextInput
                name="ration_cardno"
                control={control}
                label="Ration Card No"
              />
              <SelectInput
                name="isbpl_rationcard"
                control={control}
                label="BPL Ration Card?"
                optionKey="id"
                optionValue="value"
                optionLabel="label"
                options={booleanOptions}
              />
            </Stack>
            <Box
              sx={{
                px: '24px',
                py: '16px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
              }}
            >
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                endIcon={<SaveRoundedIcon />}
              >
                Save Record
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <CustomAlert />
    </Box>
    // </Box>
    // </Container>
  );
}

export default StudentForm;
