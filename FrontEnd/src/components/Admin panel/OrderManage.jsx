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
//import './OrderManage.css';

function OrderManage() {
    const token = useSelector((state) => state.login.token); 

    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const fetchOrders = async () => {
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
    };
    

    useEffect(() => {
        fetchOrders();
    }, [orders]);

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
    
        </Box>
    );
}

export default OrderManage;