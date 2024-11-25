import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './cartpage.css';
import { updateCart, updateQuantity, removeFromCart } from "../../../Redux/reducers/cart"
import { setLoading } from "../../../Redux/reducers/products"
import { DotLoader} from "react-spinners"; //loading spinner
import './cartpage.css';


function CartPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart.items);
    const token = useSelector((state) => state.login.token);
    const isLoading = useSelector((state) => state.products.isLoading);  
    const [error, setError] = useState(null);

    /****Fetch cart-data from the d.b****/
    useEffect(() => {
        const fetchCart = async () => {
            dispatch(setLoading(true)); 
            try {
                const response = await axios.get('http://localhost:5000/carts', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response.data)
                console.log(response.data.cart)
                // If items exist
                if (response.data && response.data.cart) {
                    dispatch(updateCart(response.data.cart.items || [])); //setUpdate cart in Redux
                    console.log(cart)
                } 
                // If no items exist
                else {
                    dispatch(updateCart([])); 
                    console.log(cart)
                }
            } 
            
            catch (err) {
                if (error.response?.status === 404) {
                    //console.log(error.response.data.message);
                    setCart({ cart_id: null, items: [] });
                }
                else {
                console.error('Error fetching cart:', err);
                setError('Failed to load the cart.');
                dispatch(updateCart([]));
                }
            }

            finally { // End loading
                dispatch(setLoading(false));
            };
    };
        fetchCart();
    }, [token, dispatch]);

    console.log(cart)
    
    /****Update the quantity of a product in the cart****/
    const handleUpdateQuantity = async (productId, newQuantity) => {
        dispatch(updateQuantity({ productId, newQuantity })); 
        console.log('Request data:', { product: productId, quantity: newQuantity });
        try {
            const response = await axios.put(
                'http://localhost:5000/carts/updateQuantity',
                { product: productId, quantity: newQuantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Response:', response.data);

            if (response.data && response.data.cart) {
                dispatch(updateCart(response.data.cart.items)); // Update cart in Redux
            }
        } 
        catch (err) {
            console.error('Error updating quantity:', err);
        }
    };


    /****Remove a product from the cart****/
    const handleRemoveProduct = async (productId) => {
        try {
            const response = await axios.delete('http://localhost:5000/carts', {
                headers: { Authorization: `Bearer ${token}` },
                data: { product: productId },
            });
            if (response.data && response.data.deleted) {
                //dispatch(removeFromCart(productId)); // Remove item from Redux
                dispatch(updateCart(response.data.cart.items))
            }
        } 
        catch (err) {
            console.error('Error removing product:', err);
        }
    };

    /****Calculate the cart summary****/
    const calculateCartSummary = () => {
        const vatRate = 0.05;
        const deliveryFee = 2.0;
        if (Array.isArray(cart) && cart.length > 0 ) {
            const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            const vat = subtotal * vatRate;
            const total = subtotal + vat + deliveryFee;
            return { subtotal, vat, deliveryFee, total };
        }
        return { subtotal: 0, vat: 0, deliveryFee, total: 0 };
    };

    const { subtotal, vat, deliveryFee, total } = calculateCartSummary();

    const handleCheckout = () => {
        navigate('/checkout');
        window.location.reload(); // Reload the page
    };


  return (
    <div className="all-the-page">
        <div className="cart-page">
                <h1 className="YourCart">Your Cart</h1>
                {error && <p className="error-message">{error}</p>}

            {isLoading ? (
                <div className="loading-indicator">
                    <DotLoader color="#3498db" size={60} />
                </div>
            ) :
                Array.isArray(cart) && cart.filter(item => item.product_id && item.quantity > 0).length > 0 && cart.length>0? (
                    <div className="cart-items">
                        {cart.map((item, index) => (
                            item.quantity > 0 && (
                            <div key={item.product_id} className="cart-item slide-up-animation">
                                <div className="item-image">
                                    <img src={item.image} alt={item.product_name} className="product-imagee" />
                                </div>
                                <div className="item-details">
                                    <h2>{item.product_name}</h2>
                                    <p>
                                        Price per unit: <strong>${item.price}</strong>
                                    </p>
                                    
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => handleUpdateQuantity(item.product_id
                                                , item.quantity - 1)}
                                            disabled={item.quantity === 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveProduct(item.
                                        product_id)}
                                        className="remove-button"
                                    >
                                        <i className="fas fa-trash"></i>{/* Delete icon */}
                                    </button>
                                    <p>
                                        Total Price: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                    </p>
                                </div>
                            </div>
                        )
                        ))}

                        {/* Order Summary */}
                        {cart.length > 0 && subtotal > 0 && (
                        <div className="order-summary">
                            <h4 className='H3CartSummary'>Cart Summary</h4>
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
                            <div className="buttons-container">
                                <button onClick={() => navigate(-1)} className="button-cart">
                                    Add More
                                </button>
                                <button className="button-cart" onClick={handleCheckout}>Proceed to Checkout</button>
                            </div>
                        </div>
                        )}
                    </div>
                ) : (
                    <p>Your cart is empty.</p>
                )}
        </div>
    </div>
    
  )
}

export default CartPage

