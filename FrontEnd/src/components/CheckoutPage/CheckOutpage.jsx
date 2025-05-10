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
        full_address: '',
        street: '',
        city: '',
        state: '',
        country: '',
        latitude: 25.276987, // Default coordinates (default location)
    longitude: 55.296249,
    });

    const [paymentMethod, setPaymentMethod] = useState('');
    const [note, setNotes] = useState('');
    const [error, setError] = useState(null);

    const handleLocationChange = (location) => {
        setShippingAddress((prev) => ({
            ...prev,
            //coordinates: location,
            latitude: location.latitude,
            longitude: location.longitude,
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


                                                                    
    const handleSubmit = async (e) => {
    e.preventDefault();

        if (!Array.isArray(cart) || cart.length === 0) {
            setError('Sorry, your cart is empty');
            return;
        }

        if (!shippingAddress ||
            !shippingAddress.full_address ||
            !shippingAddress.latitude ||
            !shippingAddress.longitude
        ) {
        setError('Please enter address coordinates.');
        return;
    }

    const { full_address, street, city, state, country, latitude, longitude  } = shippingAddress;
    if (!full_address || !street || !city || !state || !country) {
        setError('Please fill in all shipping address fields.');
        return;
    }

    /*const orderItems = cart.map(item => ({
        product: item.product_id,
        quantity: item.quantity,
        price: item.price,
    }));*/

    //console.log('Order items:', orderItems);
    console.log('Shipping address:', shippingAddress);

    console.log('Shipping address:', shippingAddress);

    try {
    console.log('Shipping address:', shippingAddress);

        const response = await axios.post('http://localhost:5000/orders', {
            shippingAddress,
            paymentMethod,
            note,
        }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log("response:",response.data)
        if (response.data.success) {
            dispatch(clearCart()); // Clear the cart after successful order
            navigate(`/order/${response.data.orderId}`);
        }
    }

    catch (err) {
        console.log('Shipping address:', shippingAddress);

            setError('Failed to create request');
            console.error('Error creating order:', err.response || err.message);
        }
    };
                                                                    

    /****Calculate the order summary****/
    const calculateCartSummary = () => {
        const vatRate = 0.05;
        const deliveryFee = 2.0;
        if (Array.isArray(cart) && cart.length > 0 ) {
            const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            const vat = subtotal * vatRate;
            const total = subtotal + vat + deliveryFee;
            return { subtotal, vat, deliveryFee, total };
        }
        return { subtotal: 0, vat: 0, deliveryFee: 0, total: 0 };
    };

    const { subtotal, vat, deliveryFee, total } = calculateCartSummary();
                                                                    

return (
    <div className="checkout-container cart-page ">
        <div className="checkout-header">
            <h1 className='H1Checkout'>Checkout</h1>
            {error && <p className="error-message">{error}</p>}
        </div>

        <form onSubmit={handleSubmit} className='slide-up-animation'>
            <div className="checkout-header">
                <h2 className='H2-titless'>Shipping Address</h2>
            </div>
            
            <input 
                type="text" 
                className="input-field" 
                placeholder="Full Address" 
                onChange={(e) => setShippingAddress({ ...shippingAddress, full_address: e.target.value })} 
                required 
            />

            <input 
                type="text" 
                className="input-field" 
                placeholder="Street" 
                onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })} 
                required 
            />

            <input 
                type="text" 
                className="input-field" 
                placeholder="City" 
                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} 
                required 
            />

            <input 
                type="text" 
                className="input-field" 
                placeholder="Country" 
                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} 
                required 
            />

            <input 
                type="text" 
                className="input-field" 
                placeholder="Phone Number" 
                onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })} 
                required 
            />

          {/* Show Location and Map */}
            <LocationComponent onLocationChange={handleLocationChange} />
          {/* Directly rendering the MapComponent here */}
          <MapComponent latitude={shippingAddress.latitude} longitude={shippingAddress.longitude} /> {/* Pass coordinates to map component */}

            <div className="checkout-header">
                <h2 className='H2-titless'>Payment Method</h2>
            </div>

            <div className="payment-options">
                <label className="payment-option">
                    <input 
                        type="radio" 
                        value="Cash" 
                        checked={paymentMethod === 'Cash'} 
                        onChange={(e) => setPaymentMethod(e.target.value)} 
                    />
                    <FaMoneyBillAlt /> Cash
                </label>

                <label className="payment-option">
                    <input 
                        type="radio" 
                        value="creditCard" 
                        checked={paymentMethod === 'creditCard'} 
                        onChange={(e) => setPaymentMethod(e.target.value)} 
                    />
                    <FaCreditCard /> Credit Card
                </label>
            </div>

            <div className="checkout-header">
                <h2 className='H2-titless'>Special Requests</h2>
            </div>
            
            <textarea 
                className="textarea-field" 
                placeholder="Any special requests..." 
                onChange={(e) => setNotes(e.target.value)} 
            />

            <div className="order-summary">
                <h3 className='H3CartSummary'>Cart Summary</h3>
                <div className="summary-item">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="summary-item vat">
                    <span>VAT (5%)</span>
                    <span>${vat.toFixed(2)}</span>
                </div>
                <div className="summary-item total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
            
            <button type="submit" className="submit-button">Submit Order</button>
        </form>
    </div>
);
};

export default CheckOutpage;
