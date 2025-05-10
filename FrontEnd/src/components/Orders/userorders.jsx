import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
    Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';  
import CancelIcon from '@mui/icons-material/Cancel';            
import { DotLoader } from "react-spinners"; // Loading spinner
import './userorders.css';

const UserOrders = () => {
    const token = useSelector((state) => state.login.token);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/orders', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.success) {
                setOrders(response.data.orders);
                console.log("response.data.orders",response.data.orders);
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

    const handleToggleDetails = (orderId) => {
        setExpandedOrderId((prevOrderId) => (prevOrderId === orderId ? null : orderId));
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box className="order-management slide-up-animation" sx={{ padding: 3. }}>
                {loading ? (
                    <div className="loading-indicator">
                        <DotLoader color="#3498db" size={50} />
                    </div>
                ) : (
                    <>
                        <Box sx={{ height: '14px' }} />
                        <Typography variant="h4" gutterBottom className="manage-title" />
                        <Typography variant="h5.4" align="center" gutterBottom className='Your-Orders-h2 manage-title'>My Orders</Typography>
                        <TableContainer component={Paper} className="order-table-container" sx={{ overflowX: 'auto' }}>
                            <Table className="order-table order-items-table" sx={{ tableLayout: 'fixed', width: '100%' }}>
                                <TableHead className="table-header">
                                    <TableRow>
                                        <TableCell sx={{ padding: '8px 16px', textAlign: 'center' }}>Order ID</TableCell>
                                        <TableCell sx={{ padding: '8px 16px', textAlign: 'center' }}>Order Date</TableCell>
                                        <TableCell sx={{ padding: '8px 16px', textAlign: 'center' }}>Total Amount</TableCell>
                                        <TableCell sx={{ padding: '8px 16px', textAlign: 'center' }}>Payment Method</TableCell>
                                        <TableCell sx={{ padding: '8px 16px', textAlign: 'center' }}>Is Delivered</TableCell>
                                        <TableCell sx={{ padding: '8px 16px', textAlign: 'center' }}>Details</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.length > 0 ? (
                                        orders.map((order) => (
                                            <React.Fragment key={order.id}>
                                                <TableRow className="table-row">
                                                    <TableCell sx={{ textAlign: 'center' }}>{order.id}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        {new Date(order.created_at).toLocaleDateString('en-US')}
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>${order.total_amount}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>{order.payment_method}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        {order.is_delivered ? (
                                                            <CheckCircleIcon sx={{ color: 'green', fontSize: 30 }} />
                                                        ) : (
                                                            <CancelIcon sx={{ color: 'red', fontSize: 30 }} />
                                                        )}
                                                    </TableCell>

                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        <IconButton onClick={() => handleToggleDetails(order.id)} className="expand-button">
                                                            <ExpandMoreIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>

                                                {/* Details */}
                                                <TableRow>
                                                    <TableCell colSpan={6}>
                                                        <Collapse in={expandedOrderId === order.id} timeout="auto" unmountOnExit>
                                                            <Box sx={{ margin: 1 }}>
                                                                <Table size="small">
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell sx={{ textAlign: 'center' }}>Product Image</TableCell>
                                                                            <TableCell sx={{ textAlign: 'center' }}>Product ID</TableCell>
                                                                            <TableCell sx={{ textAlign: 'center' }}>Product Name</TableCell>
                                                                            <TableCell sx={{ textAlign: 'center' }}>Quantity</TableCell>
                                                                            <TableCell sx={{ textAlign: 'center' }}>Price</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {order.items.map((item) => (
                                                                            <TableRow key={item.id}>
                                                                                <TableCell sx={{ textAlign: 'center' }}>
                                                                                    <img
                                                                                        src={item.image}
                                                                                        alt={item.name}
                                                                                        className="product-table-image"
                                                                                        style={{
                                                                                            width: '60px',
                                                                                            height: '60px',
                                                                                            objectFit: 'cover',
                                                                                            borderRadius: '50%',
                                                                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                                                        }}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell sx={{ textAlign: 'center' }}>{item.id}</TableCell>
                                                                                <TableCell sx={{ textAlign: 'center' }}>{item.name}</TableCell>
                                                                                <TableCell sx={{ textAlign: 'center' }}>{item.quantity}</TableCell>
                                                                                <TableCell sx={{ textAlign: 'center' }}>${item.price}</TableCell>
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
                                            <TableCell colSpan={6} className="no-orders" sx={{ textAlign: 'center' }}>
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
        </Box>
    );
}

export default UserOrders;