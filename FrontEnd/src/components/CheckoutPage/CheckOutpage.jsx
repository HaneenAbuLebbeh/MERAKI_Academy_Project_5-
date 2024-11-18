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

return (
  <div></div>
 );
};

export default CheckOutpage;
