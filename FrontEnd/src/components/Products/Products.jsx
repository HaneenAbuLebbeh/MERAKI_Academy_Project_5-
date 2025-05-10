import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, toggleFavorite, setLoading } from "../../../Redux/reducers/products";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaHeart, FaDollarSign } from 'react-icons/fa';
import { MdLocalFireDepartment } from 'react-icons/md';
import './Products.css';
import { DotLoader} from "react-spinners"; //loading spinner
import InventoryIcon from '@mui/icons-material/Inventory';

const Products = () => {
    const {  spotId } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const isLoading = useSelector((state) => state.products.isLoading);  
    const favorites = useSelector((state) => state.products.favorites);


    useEffect(() => {
        console.log("spotId in Products",spotId)
        if (spotId) {  
            // Start loading
            dispatch(setLoading(true));

            axios.get(`http://localhost:5000/products/${spotId}`)  
                .then((response) => {
                    dispatch(setProducts(response.data.products)); 
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                    dispatch(setProducts([]));
                })
                .finally(() => {
                    // End loading
                    dispatch(setLoading(false));
                });
        }
    }, [spotId, dispatch]); // Re-run when touristSpotsid changes

    // Navigate to product details when the image is clicked
    const handleproductClick = (productId) => {
        navigate(`/products/details/${productId}`);
    };

    // Toggle favorite handler
    const toggleFavoriteHandler = (productId) => {
        dispatch(toggleFavorite(productId));  
    };


    console.log("products", products)


    /******************************/
/***Change video by category***/
let videoSrc = null;
if (spotId == 6) {
    videoSrc = '/petra3.mp4';  
} else if (spotId == 28) {
    videoSrc = '/china1.mp4';  
} else if (spotId == 4) {
} else if (spotId == '/petra1.mp4') {
} else if (spotId == '/petra1.mp4') {
    videoSrc = '/main_desert.mp4';  
} else if (spotId == '/petra1.mp4') {
    videoSrc = '/main_beverges.mp4';  
} else if (spotId == '/petra1.mp4') {
    videoSrc = '/12345678.mp4';  
} else if (spotId == '/petra1.mp4') {
    videoSrc = '/12345678.mp4';  
} else if (spotId == '/petra1.mp4') {
    videoSrc = '/12345678.mp4';  
} else {
    videoSrc = '/perta1.mp4';  
}
/******************************/
/******************************/

    /**MEMORY LAND 
     * SOUVENIR PARADISE
     * 
     * Looking?
     * Seeking Memories?

    */

    return (
        <>
            {isLoading ? (
                <div className="loading-indicator">
                    <DotLoader color="#FF8A00" size={50} />
                </div>
            ) : (
                <section className="The-section slide-up-animation">
                    <section className="upper-section">
                        <div className="hero-content">
                            <span className="small-text">Seeking Memories?</span>
                            <h1>WELCOME TO <br /> MEMORY LAND </h1>
                            <p>Discover unique and timeless treasures. Shop now and create lasting memories!</p>
                        </div>
                        <div className="hero-video">
                            <video autoPlay muted loop>
                                <source src={videoSrc} type="video/mp4" />
                            </video>
                        </div>
                    </section>
                    
                    <div className="alll-cards">
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="product-card">
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
                                        <p className="price">
                                            Price: {product.price} JD
                                        </p>
                                        <div className="time-rating">
                                            <p className="timee">
                                                <InventoryIcon style={{ color: '#fffc09' ,fontSize: '17px' }} />
                                                {product.stock_quantity} Left
                                            </p>
                                            <p className="ratee">⭐ {product.rating}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>
                </section>
            )}
        </>
    );
    
};

export default Products;

