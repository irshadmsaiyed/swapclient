import { Typography, Container, Box } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import Navbar from './Navbar';
import { blue } from '@mui/material/colors';

function Layout(props) {
  const { children } = props;
  return (
    <div>
      <Head>
        <title>SWAP-Shivam Web App Portal</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="swap" content="school management system" />
      </Head>
      <Navbar />
      {/* <main> */}
      <Container maxWidth="xl">
        <Box sx={{ px: { xs: '8px', sm: '24px' }, py: '24px' }}>{children}</Box>
      </Container>
      {/* </main> */}
      <footer>
        <Box px={1} py={2} bgcolor={blue[50]}>
          <Typography textAlign="center">
            Copyright © 2022 All rights reserved Shivam Education Trust
          </Typography>
        </Box>
      </footer>
    </div>
  );
}

export default Layout;
