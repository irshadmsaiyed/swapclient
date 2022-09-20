import React from 'react';
import { Grid } from '@mui/material';

// custom components import
import StudentDataTable from '../../parts/student/StudentDataTable';
import PageTitle from '../../components/other/PageTitle';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Layout from '../../components/layout';

export default function Teacher() {
  return (
    <Layout>
      <PageTitle
        pageTitle="Student"
        pageIcon={
          <LocalLibraryIcon color="primary" sx={{ fontSize: '40px' }} />
        }
      />
      <Grid container>
        <Grid item xs={12}>
          <StudentDataTable />
        </Grid>
      </Grid>
    </Layout>
  );
}
