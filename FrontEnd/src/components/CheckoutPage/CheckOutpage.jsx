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




return (
  <div className="checkout-container cart-page ">

  </div>
);
};

export default CheckOutpage;
