import React from 'react';
import { Grid } from '@mui/material';

// icons import
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';

// custom components import
import DoughnutStat from '../../components/stats/DoughnutStat';
import CommonStat from '../../components/stats/CommonStat';
import ProgressStat from '../../components/stats/ProgressStat';
import FavouriteStdStat from '../../components/stats/FavouriteStdStat';
import PageTitle from '../../components/other/PageTitle';
import SubjectTeacherDataTable from '../../parts/subjectTeacher/SubjectTeacherDataTable';
import RecentVehicle from '../../parts/transport/RecentVehicle';
import RecentRoot from '../../parts/transport/RecentRoot';
import Layout from '../../components/layout';

export default function Home() {
  return (
    <Layout>
      <PageTitle
        pageTitle="Transport"
        pageIcon={
          <DirectionsBusRoundedIcon color="primary" sx={{ fontSize: '40px' }} />
        }
      />
      <Grid container columnSpacing={3} rowSpacing={3}>
        <Grid item xs={12} md={9}>
          <Grid container rowSpacing={4} columnSpacing={3}>
            <Grid item xs={12} md={4}>
              <CommonStat
                title="Notice Board"
                statIcon={
                  <AssignmentIcon sx={{ fontSize: '35px', color: '#0d6efd' }} />
                }
                stats={89}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <ProgressStat
                title="Present Status"
                statIcon={
                  <CalendarTodayIcon
                    sx={{ fontSize: '35px', color: '#0d6efd' }}
                  />
                }
                currentStat={1}
                progressValue={89}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FavouriteStdStat
                currentRate={3}
                currentLevel="C"
                targetLevel="B"
              />
            </Grid>

            <Grid item xs={12}>
              <SubjectTeacherDataTable />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={3}>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <DoughnutStat />
            </Grid>

            <Grid item xs={12}>
              <RecentVehicle />
            </Grid>

            <Grid item xs={12}>
              <RecentRoot />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
