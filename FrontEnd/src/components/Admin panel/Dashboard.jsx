import { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from './Sidebar';
import Header from './Header';
// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState({
    profit: 5000,
    users: 1200,
    activeGuides: 45,
    comments: 300,
  });

  // Chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (in $)',
        data: [1000, 1500, 2000, 2500, 3000, 3500],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <>
    <Header/>
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          bgcolor: 'primary.main',
          color: 'white',
          p: 2,
          display: { xs: 'none', sm: 'block' }, // Hide sidebar on small screens
        }}
      >
        <Typography variant="h6">Sidebar</Typography>
        <Sidebar/>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4">Dashboard</Typography>
        </Box>

        {/* Displaying the four cards */}
        <Grid container spacing={3}>
          {/* Profit Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Profit</Typography>
                <Typography variant="h5">${data.profit}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Users Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Users</Typography>
                <Typography variant="h5">{data.users}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Active Guides Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Active Guides</Typography>
                <Typography variant="h5">{data.activeGuides}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Comments Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">New Comments</Typography>
                <Typography variant="h5">{data.comments}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Chart Section */}
        <Box mt={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Revenue Chart</Typography>
              {/* Adjust the chart's height and width */}
              {/* <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} height={10} /> */}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default Dashboard;
