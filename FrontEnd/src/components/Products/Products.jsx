import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, toggleFavorite } from "../../../Redux/reducers/products"
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import { FaHeart, FaDollarSign } from 'react-icons/fa';
import { MdLocalFireDepartment } from 'react-icons/md';
import './Products.css'

const Products = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);  
    const favorites = useSelector((state) => state.products.favorites);
    //const { touristSpotsid } = useParams();  
    /***/let touristSpotsid = 1
    
    useEffect(() => {
        if (touristSpotsid) {  
            axios.get(`http://localhost:5000/products/${touristSpotsid}`)  
                .then((response) => {
                    dispatch(setProducts(response.data.products)); 
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                });
        }
    }, [touristSpotsid, dispatch]); // Re-run when touristSpotsid changes


// Navigate To product details when the image is clicked
const handleproductClick = (productId) => {
  navigate(`/products/details/${productId}`);
};

// adding & removing => favorites
const toggleFavoriteHandler = (productId) => {
  dispatch(toggleFavorite(productId));  
};

return (
  <section className="alll-cards">
      {products && products.length > 0 ? (
          products.map((product) => (
              <div key={product.id} className="food-card">
                  <div className="img-wrapper">
                      <img
                          src={product.image}
                          alt={product.name}
                          className="product-image"
                          onClick={() => handleproductClick(product.id)}  
                      />
                      <FaHeart
                          className={`favorite-icon ${favorites.includes(product.id) ? 'favorited' : ''}`}
                          onClick={() => toggleFavoriteHandler(product.id)} 
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

export default Products;