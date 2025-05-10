import { useState,useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import CommentIcon from '@mui/icons-material/Comment';
import { FaHandsClapping } from "react-icons/fa6";
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Charts from './Charts/Charts';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
const Dashboard = () => {
  const [profit, setProfit] = useState([])
  const token = useSelector((state) => state.login.token); 
  const [data, setData] = useState({
    profit: 0,
    users: 0,
    activeGuides: 8,
    comments: 0,
  });

  useEffect(() => {
    axios.get('http://localhost:5000/users/usersInfo', {
      headers:{Authorization:`Bearer ${token}`}
    })
      .then((res) => {
        console.log(res);
        console.log(res.data.result);

        
        setData((prevState) => ({
          ...prevState, 
          users: res.data.result.length, 
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); 

  useEffect(() => { 
    axios.get('http://localhost:5000/orders/sold/admin', {
      headers:{Authorization:`Bearer ${token}`}
    })

      .then((res) => {
        console.log(res);
        console.log(res.data.result);
        setProfit(res.data.result)
        
        


        
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); 


  useEffect(() => {
    if (profit.length > 0) {
      let sumProfit = profit.reduce((acc, crr) => acc + parseFloat(crr.total_amount), 0);
      setData((prevState) => ({
        ...prevState,
        profit: (sumProfit * 0.2), 
      }));
    }
  }, [profit]); 








  return (

    <>
    <div style={{marginLeft:'500px'}}>
    <Box sx={{ display: 'flex', height: '100vh' }}>
        <Box sx={{
          width: { xs: '100%', sm: 250 },
          color: 'white',
          p: 2,
          display: { xs: 'block', sm: 'block' },
          mt: 12,
        }}>
          <Sidebar />
        </Box>

        <Box sx={{ flexGrow: 1, p: 3  ,ml:'-500px'}}>
          {/* Welcome Section */}
          <div style={{ display: 'flex', alignItems: 'start' }}>
            <Typography variant="h6">Welcome Back!</Typography>
            <FaHandsClapping style={{ marginLeft: 8, fontSize: 30 }} />
          </div>

          {/* Dashboard Title */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">Dashboard</Typography>
          </Box>

          {/* Grid Layout for Cards */}
          <Grid container spacing={4}>
  <Grid item xs={16} sm={16} md={3}>  {/* md={4} for each card */}
    <Card sx={{ bgcolor: 'success.main', color: 'white', height: '100%' }}>
      <CardContent>
        <MonetizationOnIcon sx={{ fontSize: 40 }} />
        <Typography variant="h6">Profit</Typography>
        <Typography variant="h5">${data.profit.toPrecision(5)}</Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} sm={6} md={3}>  {/* md={4} for each card */}
    <Card sx={{ bgcolor: 'primary.main', color: 'white', height: '100%' }}>
      <CardContent>
        <PeopleIcon sx={{ fontSize: 40 }} />
        <Typography variant="h6">Users</Typography>
        <Typography variant="h5">{data.users}</Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} sm={6} md={3}>  {/* md={4} for each card */}
    <Card sx={{ bgcolor: 'warning.main', color: 'white', height: '100%' }}>
      <CardContent>
        <BookIcon sx={{ fontSize: 40 }} />
        <Typography variant="h6">Active Guides</Typography>
        <Typography variant="h5">{data.activeGuides}</Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid item xs={12} sm={6} md={3}>  {/* md={4} for each card */}
    <Card sx={{ bgcolor: 'secondary.main', color: 'white', height: '100%' }}>
      <CardContent>
        <CommentIcon sx={{ fontSize: 40 }} />
        <Typography variant="h6">New Comments</Typography>
        <Typography variant="h5">{data.comments}</Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>

          {/* Charts Section */}
          <Box sx={{ mt: 3 }}>
             <Charts /> 
          </Box>
        </Box>
      </Box>
    </div>
      
    </>
  );
};

export default Dashboard;
