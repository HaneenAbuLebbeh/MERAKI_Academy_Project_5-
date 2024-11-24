import { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import CommentIcon from '@mui/icons-material/Comment';
import { FaHandsClapping } from "react-icons/fa6";
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const [data, setData] = useState({
    profit: 5000,
    users: 1200,
    activeGuides: 45,
    comments: 300,
  });

  return (
    <>
      <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
          sx={{
            width: 250,
            bgcolor: 'primary.main',
            color: 'white',
            p: 2,
            display: { xs: 'none', sm: 'block' }, 
          }}
        >
        <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={Link} to="/orders">
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button component={Link} to="/Admin/users">
          <ListItemText primary="Users" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
    </Box>

        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6">Welcome Back!</Typography>
            <FaHandsClapping style={{ marginLeft: 8, fontSize: 30 }} />
          </div>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">Dashboard</Typography>
          </Box>

          {/* Displaying the four cards */}
          <Grid container spacing={3}>
            {/* Profit Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
                <CardContent>
                  <MonetizationOnIcon sx={{ fontSize: 40 }} />
                  <Typography variant="h6">Profit</Typography>
                  <Typography variant="h5">${data.profit}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Users Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
                <CardContent>
                  <PeopleIcon sx={{ fontSize: 40 }} />
                  <Typography variant="h6">Users</Typography>
                  <Typography variant="h5">{data.users}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Active Guides Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
                <CardContent>
                  <BookIcon sx={{ fontSize: 40 }} />
                  <Typography variant="h6">Active Guides</Typography>
                  <Typography variant="h5">{data.activeGuides}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Comments Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'secondary.main', color: 'white' }}>
                <CardContent>
                  <CommentIcon sx={{ fontSize: 40 }} />
                  <Typography variant="h6">New Comments</Typography>
                  <Typography variant="h5">{data.comments}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
