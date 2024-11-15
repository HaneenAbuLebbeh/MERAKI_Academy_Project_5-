import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setLoading, setProductDetails, setError } from "../../../Redux/reducers/products"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './ProductDetails.css';
import Cart from '../Cart/cart';
import { DotLoader} from "react-spinners"; //loading spinner

const ProductDetailes = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { productId } = useParams(); 
  const productDetails = useSelector(state => state.products.productDetails);

  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
      if (productId) {
          dispatch(setLoading(true)); 
          axios.get(`http://localhost:5000/products/details/${productId}`)
              .then((response) => {
                  dispatch(setProductDetails(response.data.product)); 
                  console.log(response.data.product)
                  console.log("Product Details in render:", productDetails.productDetails);
                  

              })
              .catch((error) => {
                  dispatch(setError("Error fetching product details")); 
              });
      }
  }, [productId, dispatch]);

  // Quantity
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  // Calculate Total price
  const totalPrice = productDetails ? (productDetails.price * quantity).toFixed(2) : 0; 

  const handleBackClick = () => {
      navigate(-1); 
  };



  return (
    <div className="product-details slide-up-animation">
        {productDetails ? (
            
            <div className="product-info">
                {/* Back*/}
                <button className="view-menu-btn" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="image-container">
                    <img src={productDetails.image} alt={productDetails.name} className="product-details-image rotating-image" />
                </div>

                <div className="details-container">

                    <h2 className="product-name">{productDetails.name}</h2>
                    <p className="product-description">{productDetails.description}</p>
                    <p className="product-price">Price per unit: ${productDetails.price}</p>

                    {/* Quantity control*/}
                    <div className="quantity-selector">
                        <button className="quantity-btn" onClick={decreaseQuantity} disabled={quantity === 1}>-</button>
                        <span className="quantity-display">{quantity}</span>
                        <button className="quantity-btn" onClick={increaseQuantity}>+</button>
                    </div>


                    <p className="total-price">Total Price : ${totalPrice}</p>

                      {/* add to cart button */}
                      <div className="cart-component">
                            <Cart 
                                productId={productDetails.id} 
                                productName={productDetails.name} 
                                productPrice={productDetails.price} 
                                quantity={quantity} 
                                hideQuantityControls={true}  
                            />
                        </div>

                </div>
            </div>
        ) : (

          <div className="loading-indicator">
          <DotLoader color="#3498db" size={50} />
          </div>
          
        )}

         {/* View Menu Button */}
        <button className="view-menu-btn" onClick={handleBackClick}>
                    <span className="arrow-icon">←</span> View Menu
                </button>
    </div>

);
};


export default ProductDetailes