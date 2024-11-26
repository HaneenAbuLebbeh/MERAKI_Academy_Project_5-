import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { FaHeart, FaDollarSign } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../../Redux/reducers/products';  
import { setProducts, setLoading } from "../../../Redux/reducers/products"
import axios from 'axios';


function FavoritesProducts() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products); 
    const isLoading = useSelector((state) => state.products.isLoading);  
    const favorites = useSelector((state) => state.products.favorites); 

    console.log("favorites :" ,favorites)

    useEffect(() => {
        //Start loading
        dispatch(setLoading(true));

        axios.get(`http://localhost:5000/products`) 
            .then((response) => {
                dispatch(setProducts(response.data.products));
                console.log("response.data.products" ,response.data.products)
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                dispatch(setProducts([])); 
            })
            .finally(() => {
                //End loading
                dispatch(setLoading(false));
            });
    }, [dispatch]);


    /**** If there are no favorite products ****/
    if (favorites.length === 0) {
        return <p>No favorites added yet.</p>;
    }

    /**** If there are no products available ****/
    /*if (!products || products.length === 0) {
        return <p>No products available.</p>;
    }*/

    /**** toggle the favorite ****/
    const toggleFavoriteHandler = (productId) => {
        dispatch(toggleFavorite(productId)); 
    };

    /**** navigate to product details when clicked ****/
    const handleCategoryClick = (productId) => {
        navigate(`/products/details/${productId}`);
    };

    console.log("products : ", products)

    return (
        <div className="favorites-list">
            <h2>My Favorite</h2>
            {products
                .filter(product => favorites.includes(product.id)) // Filter only favorite-products
                .map(product => (
                    <div key={product.id} className="food-card all-favorites-cards slide-up-animation">
                        <div className="img-wrapper">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="product-image" 
                                onClick={() => handleCategoryClick(product.id)} />
                            <FaHeart
                                className={`favorite-icon ${favorites.includes(product.id) ? 'favorited' : ''}`}
                                onClick={() => toggleFavoriteHandler(product.id)} // Toggle favorite on heart-click
                            />
                        </div>
                        <div className="details">
                            <h3>{product.name}</h3>
                            <p className="calori">
                                <FaDollarSign style={{ color: 'green', marginRight: '0px' }} />
                                Price: ${product.price}
                            </p>
                            <div className="time-rating">
                                <p className="timee">
                                    <span className="material-icons red-icon">local_fire_department</span>
                                    {product.calories} cal
                                </p>
                                <p className="ratee">⭐ {product.rating}</p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default FavoritesProducts