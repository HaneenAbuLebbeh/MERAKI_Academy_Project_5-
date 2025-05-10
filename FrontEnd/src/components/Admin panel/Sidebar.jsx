  import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/material/styles'
const Sidebar = () => {
  return (
    <Drawer
    variant="permanent"
    sx={{
      position: 'fixed', 
      top: 0,
      left: 0,
      width: 240,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
        marginTop: '70px',
        backgroundColor: 'white', 
        color: '#ffc107', 
        
      },
    }}
  >
    <List sx={{ mt: 2 }}>
     
      <ListItem button component={Link} to="/Admin/dashbored" sx={{ '&:hover': { backgroundColor: '#ffc107' } }}>
        <ListItemText primary="Dashboard" sx={{ color: 'black', '&:hover': { color: 'black' } }} />
      </ListItem>
      <ListItem button component={Link} to="/Admin/users" sx={{ '&:hover': { backgroundColor: '#ffc107' } }}>
        <ListItemText primary="Users" sx={{ color: 'black', '&:hover': { color: 'black' } }} />
        </ListItem>
      <ListItem button component={Link} to="/Admin/categories" sx={{ '&:hover': { backgroundColor: '#ffc107' } }}>
        <ListItemText primary="Categories" sx={{ color: 'black', '&:hover': { color: '#black' } }} />

      </ListItem>
      <ListItem button component={Link} to="/Admin/products" sx={{ '&:hover': { backgroundColor: '#ffc107' } }}>
        <ListItemText primary="Products" sx={{ color: 'black', '&:hover': { color: 'black' } }} />
      </ListItem>
      
      <ListItem button component={Link} to="/Admin/orders" sx={{ '&:hover': { backgroundColor: '#ffc107' } }}>
        <ListItemText primary="Orders" sx={{ color: 'black', '&:hover': { color: 'black' } }} />
      </ListItem>
      
      
        
    </List>
    <Divider sx={{ backgroundColor: '#0D2D7A' }} />
  </Drawer>
  );
}; 

export default Sidebar; 
 