import React from 'react';
import { Grid } from '@mui/material';

// icons import
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Filter1RoundedIcon from '@mui/icons-material/Filter1Rounded';
import Filter2RoundedIcon from '@mui/icons-material/Filter2Rounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import WbTwilightRoundedIcon from '@mui/icons-material/WbTwilightRounded';

// custom components import
import CommonStat2 from '../../components/stats/CommonStat2';
import FeeTransactionDataTable from '../../parts/fee/FeeTransactionDataTable';
import PageTitle from '../../components/other/PageTitle';
import BarChartStat from '../../components/stats/BarChartStat';
import RecentFee from '../../parts/fee/RecentFee';
import Layout from '../../components/layout';

export default function Home() {
  return (
    <Layout>
      <PageTitle
        pageTitle="fee"
        pageIcon={
          <CurrencyRupeeIcon color="primary" sx={{ fontSize: '40px' }} />
        }
      />
      <Grid container columnSpacing={3} rowSpacing={3}>
        <Grid item xs={12} md={9}>
          <Grid container rowSpacing={4} columnSpacing={3}>
            <Grid item xs={12} md={3}>
              <CommonStat2
                title="Session-1"
                statIcon={<Filter1RoundedIcon sx={{ fontSize: '35px' }} />}
                stats="01-06-2022 to 30-10-2022"
                bgColor="#c8facd"
                color="#007b55"
                backgroundImage="linear-gradient(135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 100%)"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CommonStat2
                title="Session-2"
                statIcon={<Filter2RoundedIcon sx={{ fontSize: '35px' }} />}
                stats="01-06-2022 to 30-10-2022"
                bgColor="#d0f2ff"
                color="#04297a"
                backgroundImage="linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CommonStat2
                title="Diwali"
                statIcon={<AutoAwesomeRoundedIcon sx={{ fontSize: '35px' }} />}
                stats="01-06-2022 to 30-10-2022"
                bgColor="#fff7cd"
                color="#7a4f01"
                backgroundImage="linear-gradient(135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 100%)"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CommonStat2
                title="Summer"
                statIcon={<WbTwilightRoundedIcon sx={{ fontSize: '35px' }} />}
                stats="01-06-2022 to 30-10-2022"
                bgColor="#ffe7d9"
                color="#7a0c2e"
                backgroundImage="linear-gradient(135deg, rgba(183, 33, 54, 0) 0%, rgba(183, 33, 54, 0.24) 100%)"
              />
            </Grid>

            <Grid item xs={12}>
              <FeeTransactionDataTable />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={3}>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <BarChartStat />
            </Grid>

            <Grid item xs={12}>
              <RecentFee />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
