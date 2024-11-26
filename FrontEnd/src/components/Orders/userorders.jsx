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
    Snackbar,
    Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
            } else {
                setError('Failed to fetch orders.');
            }
        } catch (err) {
            setError('Error fetching orders.');
            console.error(err);
        } finally {
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
        <Box
            className="order-manageeeee"
            p={3}
            sx={{
                maxWidth: '1170px',
                margin: 'auto',
                backgroundColor: '#F4F7F9',
                borderRadius: '10px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.05)',
            }}
        >
            <Typography variant="h5.4" align="center" gutterBottom className="Your-Orders-h2">
                Your Orders
            </Typography>
            {loading && <Typography>Loading orders...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            {!loading && !error && orders.length === 0 && <Typography>No orders found.</Typography>}
            <TableContainer component={Paper}>
                <Table className="order-table"> {/* تم تغيير هذه الفئة إلى order-table */}
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Is Delivered</TableCell>
                            <TableCell>Order Items</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <OrderRow
                                key={order.id}
                                order={order}
                                expandedOrderId={expandedOrderId}
                                handleToggleDetails={handleToggleDetails}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

const OrderRow = ({ order, expandedOrderId, handleToggleDetails }) => {
    const isOpen = expandedOrderId === order.id;


    return (
        <>
            <TableRow>
                <TableCell>{order.id}</TableCell>
                <TableCell>{new Date(order.created_at).toLocaleDateString('en-US')}</TableCell>
                <TableCell>${order.total_amount}</TableCell>
                <TableCell>{order.isDelivered ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                    <IconButton onClick={() => handleToggleDetails(order.id)}>
                        <ExpandMoreIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={5} sx={{ padding: 0 }}>
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" className="order-table"> {/* تم تغيير هذه الفئة إلى order-table */}
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product Image</TableCell>
                                        <TableCell>Product ID</TableCell>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.items.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
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
        </>
    );
};

export default UserOrders;
