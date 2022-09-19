import React, { useEffect } from 'react';
import { Box, Grid, Stack, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import WallpaperRoundedIcon from '@mui/icons-material/WallpaperRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import { useDispatch } from 'react-redux';

import { openAlert } from '../../features/modal/modalSlice';
import CustomAlert from '../../components/other/CustomAlert';

import TextInput from '../../components/form-input/TextInput';
import SelectInput from '../../components/form-input/SelectInput';
import RadioInput from '../../components/form-input/RadioInput';
import DateInput from '../../components/form-input/DateInput';
import FileInput from '../../components/form-input/FileInput';
import Image from 'next/image';

import useCreateRecord from '../../hooks/useCreateRecord';
import useUpdateRecord from '../../hooks/useUpdateRecord';
import useDistinctList from '../../hooks/useDistinctList';
import { defaultValues, validationSchema } from '../../schemas/employeeSchema';

import myImage from '../../public/user_image.jpg';
import backgroundImage from '../../public/c2.jpeg';

import {
  districtOptions,
  stateOptions,
  genderOptions,
  casteOptions,
  religionOptions,
  appointmentOptions,
  eduQualificationOptions,
  proQualificationOptions,
  sectionOptions,
  mediumOptions,
  designationOptions,
} from '../../utils/commonObjects';
import { useRouter } from 'next/router';

function EmployeeForm({ data = defaultValues }) {
  const dispatch = useDispatch();
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

  const { mutate: createEmployee } = useCreateRecord(
    'employee',
    handleOpenAlert
  );
  const { mutate: updateEmployee } = useUpdateRecord(
    'employee',
    handleOpenAlert
  );

  const { data: subjectOptions } = useDistinctList('subject', 'distinct');

  useEffect(() => {
    reset({ ...data });
  }, [data, reset]);

  // form submit method
  const onSubmit = (formValues) => {
    const { profile_image, ...restData } = formValues;
    const formData = { profile_image: formValues.profile_image, ...restData };
    console.log(hasId);
    console.log(formData);
    if (hasId) {
      updateEmployee(formData);
    } else {
      createEmployee(formData);
    }
    router.push('/employee');
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
    <Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: '2.5rem',
          textTransform: 'uppercase',
          letterSpacing: '6px',
          marginBottom: '40px',
        }}
      >
        Employee
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
                backgroundImage: 'url(/c2.jpeg)',
                backgroundPosition: '50%',
                backgroundSize: 'cover',
              }}
            />
            <Box
              sx={{
                width: '120px',
                height: '120px',
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
                src="/user_image.jpg"
                alt=""
                width="120px"
                height="120px"
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
                {hasId
                  ? `${data.first_name} ${data.last_name}`
                  : 'Employee Name'}
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
                Background
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
                  Profile
                </Button>
              </FileInput>
            </Stack>
          </Box>

          {/* ==========> contact details */}
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
            <Stack gap={3} sx={{ my: '32px', px: '32px' }}>
              <TextInput
                name="mobile_no1"
                control={control}
                label="Mobile No-1"
              />
              <TextInput
                name="mobile_no2"
                control={control}
                label="Mobile No-2"
              />
              <TextInput
                name="whatsapp_no"
                control={control}
                label="Whatsapp No"
              />
              <TextInput name="email" control={control} label="Email Address" />
            </Stack>
          </Stack>

          {/* =========> professional details */}
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
              <WorkspacePremiumRoundedIcon />
              <Typography
                variant="subtitle1"
                letterSpacing={2}
                fontWeight={500}
                textTransform="uppercase"
              >
                Professional Details
              </Typography>
            </Box>
            <Stack gap={3} sx={{ my: '32px', px: '32px' }}>
              <SelectInput
                name="appointment_nature"
                control={control}
                label="Appointment Nature"
                options={appointmentOptions}
              />
              <DateInput
                name="joining_date"
                control={control}
                label="Joining Date"
              />
              <TextInput
                name="experience_years"
                control={control}
                label="Experience (in years)"
              />
              <TextInput
                name="monthly_salary"
                control={control}
                label="Salary (monthly)"
              />
              <TextInput
                name="sanctioned_leave"
                control={control}
                label="Sanctioned Leave (yearly)"
              />
              <TextInput
                name="driving_licence"
                control={control}
                label="Driving Licence No"
              />
              <TextInput
                name="recruited_by"
                control={control}
                label="Recruited By"
              />
            </Stack>
          </Stack>
        </Grid>

        {/* ============================>right side grid */}

        {/* personal details */}
        <Grid item xs={12} md={9}>
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
              gap={3}
              sx={{ mt: '32px', px: '32px' }}
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
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={3}
              sx={{ mt: '24px', px: '32px' }}
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
                  name="city"
                  control={control}
                  label="Village/Town/City"
                />
              </Box>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={3}
              sx={{ mt: '24px', px: '32px' }}
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
              gap={3}
              sx={{ mt: '24px', px: '32px' }}
            >
              <Box sx={{ flex: 1 }}>
                <TextInput name="pin" control={control} label="Pin code" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <RadioInput
                  name="gender"
                  control={control}
                  label="Gender"
                  options={genderOptions}
                />
              </Box>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={3}
              sx={{ my: '24px', px: '32px' }}
            >
              <DateInput
                name="birth_date"
                control={control}
                label="Birth-Date"
              />
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
            </Stack>
          </Stack>

          {/* ============================> educational details */}
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
                Educational Details
              </Typography>
            </Box>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={3}
              sx={{ mt: '32px', px: '32px' }}
            >
              <SelectInput
                name="educational_qualification"
                control={control}
                label="Educational Qualification"
                options={eduQualificationOptions}
              />
              <SelectInput
                name="professional_qualification"
                control={control}
                label="Professional Qualification"
                options={proQualificationOptions}
              />
              <SelectInput
                name="designation"
                control={control}
                label="Designation"
                options={designationOptions}
              />
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={3}
              sx={{ mt: '24px', px: '32px' }}
            >
              <Box sx={{ flex: 1 }}>
                <SelectInput
                  name="appointed_section"
                  control={control}
                  label="Appointed Section"
                  options={sectionOptions}
                />
              </Box>
              <Box sx={{ flex: 2 }}>
                <RadioInput
                  name="medium"
                  control={control}
                  label="Medium"
                  options={mediumOptions}
                />
              </Box>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={3}
              sx={{ mt: '24px', px: '32px' }}
            >
              <SelectInput
                name="appointed_subject"
                control={control}
                label="Appointed Subject"
                options={subjectOptions?.rows}
                optionKey="subject_id"
                optionValue="subject_name"
                optionLabel="subject_name"
              />
              <SelectInput
                name="main_subject1"
                control={control}
                label="Main Subject-1"
                options={subjectOptions?.rows}
                optionKey="subject_id"
                optionValue="subject_name"
                optionLabel="subject_name"
              />
              <SelectInput
                name="main_subject2"
                control={control}
                label="Main Subject-2"
                options={subjectOptions?.rows}
                optionKey="subject_id"
                optionValue="subject_name"
                optionLabel="subject_name"
              />
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={3}
              sx={{ my: '24px', px: '32px' }}
            >
              <SelectInput
                name="subsidiary_subject1"
                control={control}
                label="Subsidiary Subject1"
                options={subjectOptions?.rows}
                optionKey="subject_id"
                optionValue="subject_name"
                optionLabel="subject_name"
              />
              <SelectInput
                name="subsidiary_subject2"
                control={control}
                label="Subsidiary Subject2"
                options={subjectOptions?.rows}
                optionKey="subject_id"
                optionValue="subject_name"
                optionLabel="subject_name"
              />
              <SelectInput
                name="subsidiary_subject3"
                control={control}
                label="Subsidiary Subject3"
                options={subjectOptions?.rows}
                optionKey="subject_id"
                optionValue="subject_name"
                optionLabel="subject_name"
              />
            </Stack>
          </Stack>

          {/* ======================> banking details */}
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
                Banking Details
              </Typography>
            </Box>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={3}
              sx={{ mt: '32px', px: '32px' }}
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
              gap={3}
              sx={{ my: '24px', px: '32px' }}
            >
              <Box sx={{ flex: 2 }}>
                <TextInput
                  name="bank_account"
                  control={control}
                  label="Account No"
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextInput
                  name="ifsc_code"
                  control={control}
                  label="IFSC Code"
                />
              </Box>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={3}
              sx={{ px: '32px' }}
            >
              <Box sx={{ flex: 2 }}>
                <TextInput
                  name="aadhar_no"
                  control={control}
                  label="Aadhar No"
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextInput name="pan_no" control={control} label="PAN No" />
              </Box>
            </Stack>
            <Box
              sx={{
                px: '24px',
                py: '24px',
                mt: '24px',
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
  );
}

export default EmployeeForm;
