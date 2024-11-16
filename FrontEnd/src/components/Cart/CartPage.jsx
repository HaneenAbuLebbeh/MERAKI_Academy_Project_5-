import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './cartpage.css';
import { updateCart, updateQuantity, removeFromCart } from "../../../Redux/reducers/cart"


function CartPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart.items);
    const token = useSelector((state) => state.login.token);
    const [error, setError] = useState(null);

    /****Fetch cart-data from the d.b****/
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://localhost:5000/carts', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // If items exist
                if (response.data && response.data.cart) {
                    dispatch(updateCart(response.data.cart.items)); //setUpdate cart in Redux
                } 
                // If no items exist
                else {
                    dispatch(updateCart([])); 
                }
            } 
            
            catch (err) {
                console.error('Error fetching cart:', err);
                setError('Failed to load the cart.');
            }
    };
        fetchCart();
    }, [token, dispatch]);


    /****Update the quantity of a product in the cart****/
    const handleUpdateQuantity = async (productId, newQuantity) => {
        try {
            const response = await axios.put(
                'http://localhost:5000/carts/updateQuantity',
                { product: productId, quantity: newQuantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
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
                dispatch(removeFromCart(productId)); // Remove item from Redux
            }
        } 
        catch (err) {
            console.error('Error removing product:', err);
        }
    };
    
  return (
    <div>

    </div>
    
  )
}

export default CartPage

