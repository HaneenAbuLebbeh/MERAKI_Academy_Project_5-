import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from "../../../Redux/reducers/products";
import { DotLoader} from "react-spinners"; //loading spinner
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
    Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

//import './OrderManage.css';


function OrderManage() {
    const dispatch = useDispatch();

    const token = useSelector((state) => state.login.token); 
    const isLoading = useSelector((state) => state.products.isLoading); 

    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const fetchOrders = async () => {
        // Start loading
        dispatch(setLoading(true));
        
        try {
            console.log('Fetching orders with token:', token); 
            const response = await axios.get('http://localhost:5000/orders/admin', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("response:",response); 
            if (response.data.success) {

                // Set default status => processing
                const fetchedOrders = response.data.orders.map(order => ({
                    ...order,
                    status: order.status || 'processing', 
                }));

                setOrders(response.data.orders
                    || []);
                localStorage.setItem('orders', JSON.stringify(response.data.orders || []));
            } 
            else {
                setMessage('Failed to fetch orders.');
                setOpenSnackbar(true);
            }
        } 

        catch (error) {
            console.error('Error fetching orders:', error); 
            setMessage(error.response ? error.response.data.message : 'Error fetching orders.');
            setOpenSnackbar(true);
        }

        // Stop loading
        finally {
            dispatch(setLoading(false));
        }
    };
    

    useEffect(() => {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders)); 
        } 
        else {
            fetchOrders();
        }
    }, []);

    console.log("orders:",orders); 
    console.log("orders type:", Array.isArray(orders), orders);

    // Expand or collapse order details
    const handleExpandClick = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    // Close the snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    // format Date from iso to => : "10/4/2003 09:05:03"
    const formatDate= (isoDate) => {
        const date = new Date(isoDate);
        const day = date.getDate(); 
        const month = date.getMonth() + 1; 
        const year = date.getFullYear(); 
    
        const hours = date.getHours(); 
        const minutes = date.getMinutes(); 
        const seconds = date.getSeconds(); 
    
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    
        return `${day}/${month}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;  
    };
    

    // set the-status of the order => when clicking on the icons (**setOrders=>order+status**)
    const handleOrderStatusChange = (orderId, status) => {
        const updatedOrders = orders.map(order => 
            order.id === orderId ? { ...order, status } : order
        );
        setOrders(updatedOrders);
        
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
    };

    // set text color based on => order status
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'green';//return '#28a745';
            case 'cancelled':
                return 'red';
            case 'processing':
                return '#ffc107'; 
            default:
                return 'black';
        }
    };

    return (
        <Box className="order-management slide-up-animation" sx={{ padding: 2 }}>
        
{isLoading ? (
        <div className="loading-indicator">
        <DotLoader color="#3498db" size={50} />
        </div>
        ) : (
            <>
            <Typography variant="h4" gutterBottom className="manage-title">
                Manage Orders
            </Typography>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={message}
            />
            <TableContainer component={Paper} className="order-table-container">
                <Table className="order-table order-items-table">
                    <TableHead className="table-header">
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Shipping Address</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(orders) && orders.length > 0 ? (
                            orders.map((order) => (
                                <React.Fragment key={order.id}>
                                    <TableRow className="table-row">
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{formatDate(order.created_at)}</TableCell>
                                        <TableCell>{order.full_address
                                        }</TableCell>
                                        <TableCell>{order.state}</TableCell>
                                        <TableCell>{order.total_amount}</TableCell>
                                        <TableCell>{order.payment_method}</TableCell>
                                        <TableCell>
                                            {`${order.latitude}, ${order.longitude}`}
                                        </TableCell>

                                        <TableCell style={{ color: getStatusColor(order.status) }}>
                                                    {order.status}
                                        </TableCell>

                                        <TableCell sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                                    
                                                     <IconButton 
                                                        onClick={() => handleOrderStatusChange(order.id, 'completed')}
                                                        style={{ color: '#28a745' }} 
                                                    >
                                                        <CheckIcon />
                                                    </IconButton>
                                                     <IconButton 
                                                        onClick={() => handleOrderStatusChange(order.id, 'cancelled')}
                                                        style={{ color: '#dc3545' }}
                                                    >
                                                        <CancelIcon />
                                                    </IconButton>
                                                     <IconButton 
                                                        onClick={() => handleOrderStatusChange(order.id, 'processing')}
                                                        style={{ color: '#ffc107' }}
                                                    >
                                                        <HourglassEmptyIcon />
                                                    </IconButton>
                                        </TableCell>


                                        <TableCell>
                                            <IconButton onClick={() => handleExpandClick(order.id)} className="expand-button">
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    {/* Details */}
                                    <TableRow>
                                        <TableCell colSpan={8}>
                                            <Collapse in={expandedOrderId === order.id} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <Typography variant="h6">Order Items</Typography>
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Product ID</TableCell>
                                                                <TableCell>Product Name</TableCell>
                                                                <TableCell>Quantity</TableCell>
                                                                <TableCell>Price</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {order.items.map((item) => (
                                                                <TableRow key={item.id}>
                                                                    <TableCell>{item.id}</TableCell>
                                                                    <TableCell>{item.name}</TableCell>
                                                                    <TableCell>{item.quantity}</TableCell>
                                                                    <TableCell>${item.price}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="no-orders">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
    </>
    )}
        </Box>
    );
}

export default OrderManage;