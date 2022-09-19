import React from 'react';
import { Grid } from '@mui/material';

// icons import
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// custom components import
import UserDataTable from '../../parts/user/UserDataTable';
import PageTitle from '../../components/other/PageTitle';
import Layout from '../../components/layout';

export default function Users() {
  return (
    <Layout>
      <PageTitle
        pageTitle="Users"
        pageIcon={
          <AccountCircleIcon color="primary" sx={{ fontSize: '40px' }} />
        }
      />
      <Grid container>
        <Grid item xs={12}>
          <UserDataTable />
        </Grid>
      </Grid>
    </Layout>
  );
}
