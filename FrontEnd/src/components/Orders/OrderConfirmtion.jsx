import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const OrderConfirmation = () => {
    const navigate = useNavigate();

    const token = useSelector((state) => state.login.token);
    const { id } = useParams(); 
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState(null);


    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                console.log("response.data :" , response.data)
                console.log("response.data.order :" , response.data.order)
                setOrderDetails(response.data.order);
                console.log("orderDetails :" , orderDetails)
            } 
            else {
                setError('Failed to fetch order details.');
            }
        } 
        catch (err) {
            console.error('Error fetching order details:', err);
            setError('Failed to fetch order details.');
        }
    };

    useEffect(() => {
        if (id) {
            fetchOrderDetails();
        } 
        else {
            setError('Order ID is missing.');
        }
    }, [id]);

    return (
        <div className="order-confirmation-container">
            <h1>Your order has been received!</h1>
        </div>
    );
}

export default OrderConfirmation
