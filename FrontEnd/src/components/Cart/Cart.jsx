import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../../../Redux/reducers/Cart" ;


const Cart = ({ productId, productName, productPrice, quantity, setQuantity }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(state => state.login.token); 
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);

  const handleAddToCart = () => {
    if (!token || token === "undefined" || token === null ) {
        alert('You need to be logged in to add items to the cart.');
        navigate('/Login');
        return;
    }

    axios.post('http://localhost:5000/carts/add', 
        { product: productId, quantity: quantity }, 
        { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
        if (response.data.success) {
            // Add the product to the cart using Redux
            dispatch(addToCart({ productId, productName, productPrice, quantity }));
            toast.success('Product added to cart successfully!');
            navigate(-1);  // Return to the previous page
        }
        else {
            alert(response.data.message || 'Failed to add product.');
            console.log('Failed to add product:', response.data.message);
        }
    })
    .catch((err) => {
        if (err.response) {
            if (err.response.status === 403) {
                alert('You do not have permission to perform this action.');
            }
            else {
                alert(err.response.data.message || 'Failed to add product to cart.');
            }
            console.log('Error adding product to cart:', err.response.data);
        } 
        else {
            alert('An unknown error occurred.');
            console.log('Error adding product to cart:', err);
        }
    });
};


  return (
    <div>

    <div className="cart-component slide-up-animation">
            <button onClick={handleAddToCart}>Add to Cart</button>
    </div>

    </div>
  )
}

export default Cart