import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, toggleFavorite, setLoading } from "../../../Redux/reducers/products"; 
import axios from 'axios';
import { FaHeart, FaDollarSign } from 'react-icons/fa';
import { MdLocalFireDepartment } from 'react-icons/md';
import { DotLoader } from "react-spinners"; 
//import './products.css'; 


const Market = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products);
    const isLoading = useSelector((state) => state.products.isLoading);
    const favorites = useSelector((state) => state.products.favorites);


    useEffect(() => {
        //Start loading
        dispatch(setLoading(true));

        axios.get(`http://localhost:5000/products`) 
            .then((response) => {
                dispatch(setProducts(response.data.products));
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


    //Navigate to product-details when the image is clicked
    const handleProductClick = (productId) => {
        navigate(`/market/details/${productId}`);
    };

    //Toggle favorite 
    const toggleFavoriteHandler = (productId) => {
        dispatch(toggleFavorite(productId));
    };


    return (
        <section className="alll-cards">
            {isLoading ? (
                <div className="loading-indicator">
                    <DotLoader color="#3498db" size={50} />
                </div>
            ) : products && products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id} className="food-card">
                        
                        <div className="img-wrapper">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="product-image"
                                onClick={() => handleProductClick(product.id)} 
                            />
                            <FaHeart
                                className={`favorite-icon ${favorites.includes(product.id) ? 'favorited' : ''}`}
                                onClick={() => toggleFavoriteHandler(product.id)} // Toggle favorite
                            />
                        </div>
                        
                        <div className="details">
                            <h3>{product.name}</h3>
                            <p className="calori">
                                <FaDollarSign className="price-icon" />
                                Price: {product.price} JD
                            </p>
                            
                            <div className="time-rating">
                                <p className="timee">
                                    <MdLocalFireDepartment className="fire-icon" />
                                    {product.extra} ext
                                </p>
                                <p className="ratee">⭐ {product.rating}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No products found.</p>
            )}
        </section>
    );
};

export default Market;
