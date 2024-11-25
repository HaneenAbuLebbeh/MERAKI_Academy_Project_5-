import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from "../../../Redux/reducers/products";
import { DotLoader} from "react-spinners"; //loading spinner
import './OrderConfirmation.css'


const OrderConfirmation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.login.token);
    const { id } = useParams(); 
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState(null);
    const isLoading = useSelector((state) => state.products.isLoading);  


    const fetchOrderDetails = async () => {
        try {
            // Start loading
            dispatch(setLoading(true));

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

        finally {
          // Stop loading
          dispatch(setLoading(false));
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
            <div className="video-container">
                  <video width="600" autoPlay loop muted>
                    <source src="/tawseel.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
            </div>

            <p>Be ready! our representative will contact you soon!</p>
            
      {isLoading ? (
                <div className="loading-indicator">
                    <DotLoader color="#3498db" size={50} />
                </div>
                ) :
                orderDetails ? (
                      <>  
                          <h2>Order Details:</h2>
                          <p>Order Number: {orderDetails.id}</p>
                          <p>Shipping Address: {orderDetails.full_address}</p>
                          <p>Total: {orderDetails.total_amount
                          }</p>
                          <p>Payment Method: {orderDetails.payment_method}</p>
                          <button onClick={() => navigate('/my-orders')}>View all previous orders</button>
                      </>
                  ) : (
                      error && <p style={{ color: 'red' }}>{error}</p>
                      )}
              
        </div>
    );
}

export default OrderConfirmation
