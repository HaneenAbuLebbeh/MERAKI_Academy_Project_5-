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
    Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { setLoading } from "../../../Redux/reducers/products";
import { DotLoader} from "react-spinners"; //loading spinner
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
                setOrders(response.data.orders
                    || []);
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
        fetchOrders();
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
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(orders) && orders.length > 0 ? (
                            orders.map((order) => (
                                <React.Fragment key={order.id}>
                                    <TableRow className="table-row">
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{order.created_at}</TableCell>
                                        <TableCell>{order.full_address
                                        }</TableCell>
                                        <TableCell>{order.state}</TableCell>
                                        <TableCell>{order.total_amount}</TableCell>
                                        <TableCell>{order.payment_method}</TableCell>
                                        <TableCell>
                                            {order
                                                ? `${order.latitude}, ${order.longitude}`
                                                : 'Location not available'}
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