import React from 'react';
import { Grid } from '@mui/material';

// icons import
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// custom components import
import DoughnutStat from '../../components/stats/DoughnutStat';
import CommonStat from '../../components/stats/CommonStat';
import ProgressStat from '../../components/stats/ProgressStat';
import FavouriteStdStat from '../../components/stats/FavouriteStdStat';
import StudentDataTable from '../../parts/student/StudentDataTable';
import RecentSubject from '../../parts/subject/RecentSubject';
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
