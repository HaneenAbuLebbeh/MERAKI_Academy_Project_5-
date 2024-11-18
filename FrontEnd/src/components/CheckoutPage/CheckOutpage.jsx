import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillAlt, FaCreditCard } from 'react-icons/fa';
import axios from 'axios';
import { clearCart ,updateCart } from "../../../Redux/reducers/cart"
import MapComponent from "../../components/MapComponent/MapComponent"
import LocationComponent from "../../components/MapComponent/LocationComponent"
import './CheckoutPage.css';

const CheckOutpage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.login.token);
  const cart = useSelector((state) => state.cart.items);

  const [shippingAddress, setShippingAddress] = useState({
      fullAddress: '',
      street: '',
      city: '',
      state: '',
      country: '',
      coordinates: { latitude: 25.276987, longitude: 55.296249 }, // Default coordinates (default location)
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [note, setNotes] = useState('');
  const [error, setError] = useState(null);

  const handleLocationChange = (location) => {
      setShippingAddress((prev) => ({
          ...prev,
          coordinates: location,
      }));
  };

   console.log("hi this is the cart");
   console.log(cart);

  useEffect(() => {
      // Automatically fetch user's location on mount
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const { latitude, longitude } = position.coords;
              handleLocationChange({ latitude, longitude });
          },
          (err) => {
              console.error('Error fetching location:', err);
          }
      );
  }, []);


                                                                  gi
  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!Array.isArray(cart) || cart.length === 0) {
        setError('Sorry, your cart is empty');
        return;
    }

    if (!shippingAddress.coordinates || !shippingAddress.coordinates.latitude || !shippingAddress.coordinates.longitude) {
        setError('Please enter address coordinates.');
        return;
    }

    const { fullAddress, street, city, state, country } = shippingAddress;
    if (!fullAddress || !street || !city || !state || !country) {
        setError('Please fill in all shipping address fields.');
        return;
    }

    const orderItems = cart.map(item => ({
        product: item.productId,
        quantity: item.quantity,
        price: item.productPrice,
    }));

    try {
        const response = await axios.post('http://localhost:5000/orders', {
            shippingAddress,
            paymentMethod,
            note,
            orderItems,
        }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        
          if (response.data.success) {
              dispatch(clearCart()); // Clear the cart after successful order
              navigate(`/order/${response.data.order._id}`);
          }
      }

      catch (err) {
          setError('Failed to create request');
          console.error('Error creating order:', err.response || err.message);
      }
  };




return (
  <div className="checkout-container cart-page ">

  </div>
);
};

export default CheckOutpage;
