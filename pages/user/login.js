import { Box, Grid, Container, Typography, Divider } from '@mui/material';
import { Stack } from '@mui/system';
import Image from 'next/image';
import React from 'react';
import LoginForm from '../../parts/user/LoginForm';
import { indigo, grey } from '@mui/material/colors';

function Login() {
  return (
    <Grid container columnSpacing={0} rowSpacing={[0, 0]}>
      <Grid item xs={12} md={5}>
        <Stack bgcolor="#ccdaff" height="100vh" spacing={3}>
          <Box>
            <Typography
              noWrap
              component="div"
              px={1}
              sx={{
                fontWeight: '600',
                fontSize: '1.5rem',
                lineHeight: '42px',
                color: indigo[400],
              }}
            >
              SWAP
            </Typography>
          </Box>
          <Stack alignItems="center" mt={1}>
            <Image src="/shivamlogo.png" alt="" width="150px" height="150px" />
          </Stack>
          <Stack px={[4, 12]}>
            <LoginForm />
            <Divider variant="fullWidth" sx={{ my: 3 }} />
            <Stack alignItems="center">
              <Typography
                noWrap
                component="div"
                px={1}
                sx={{
                  fontWeight: '500',
                  fontSize: '1.2rem',
                  color: grey[600],
                }}
              >
                Do not have an account ?
              </Typography>
              <Typography
                noWrap
                component="div"
                px={1}
                sx={{
                  fontWeight: '500',
                  fontSize: '1.2rem',
                  color: indigo[400],
                }}
              >
                Contact to Mr.Dishant Thakor (Admin)
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={7}>
        <Box
          width="100%"
          height="100vh"
          sx={{
            backgroundImage: 'url(/coming_soon2.jpg)',
            backgroundPosition: '50%',
            backgroundSize: 'cover',
          }}
        >
          {/* <Image src="/coming_soon.jpg" alt="" width="100%" height="100%" /> */}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
