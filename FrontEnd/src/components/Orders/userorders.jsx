import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Collapse,
    Snackbar,
    Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const UserOrders = () => {
    const token = useSelector(state => state.login.token);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/orders', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                console.log("response.data",response.data)
                console.log("response.data.orders",response.data.orders)
                setOrders(response.data.orders);
                console.log("orders :", orders)
            }
            else {
                setError('Failed to fetch orders.');
            }
        }
        catch (err) {
            setError('Error fetching orders.');
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchOrders();
    }, []);


    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };
    console.log("orders-out :", orders)


    return (
        <Box className="order-manageeeee" p={3} sx={{ maxWidth: '1170px', margin: 'auto', backgroundColor: '#F4F7F9', borderRadius: '10px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.05)' }}>
            <Typography variant="h5.4" align="center" gutterBottom className='Your-Orders-h2'>Your Orders</Typography>
            {loading && <Typography>Loading orders...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            {!loading && !error && orders.length === 0 && <Typography>No orders found.</Typography>}
            <TableContainer component={Paper} >
                <Table className='slide-up-animation'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Is Delivered</TableCell>
                            <TableCell>Order Items</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <OrderRow key={order.id} order={order} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Order fetched successfully"
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                        <ExpandMoreIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Box>
    );
};

export default UserOrders;