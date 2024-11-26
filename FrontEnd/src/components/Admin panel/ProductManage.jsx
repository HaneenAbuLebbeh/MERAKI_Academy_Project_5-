import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, toggleFavorite, setLoading } from "../../../Redux/reducers/products";
import axios from 'axios';
import { FaHeart, FaEdit, FaTrash } from 'react-icons/fa';
import { DotLoader } from "react-spinners";
import Sidebar from './Sidebar';
import { FaBox, FaDollarSign, FaCogs, FaStar, FaInfoCircle } from 'react-icons/fa';
import './Admin.css';


const AdminPanel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products);
    const isLoading = useSelector((state) => state.products.isLoading);

    useEffect(() => {
        // Start loading
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
                // End loading
                dispatch(setLoading(false));
            });
    }, [dispatch]);

    const handleEditProduct = (productId) => {
        navigate(`/admin/edit-product/${productId}`);
    };

    const handleDeleteProduct = (productId) => {
        //
        console.log(`Delete product with ID: ${productId}`);
    };

    return (
    
    <div className="admin-container">
        <Sidebar />
        <div className="admin-content">

            <h1 className="admin-title">Manage Products</h1>
            {isLoading ? (
                <div className="loading-indicator">
                    <DotLoader color="#3498db" size={50} />
                </div>
            ) : products && products.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Stock Quantity</th>
                            <th>Rating</th>
                            <th>Extra Info</th>
                            <th>Featured</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} >
                                <td>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="product-table-image"
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.price} JD</td>
                                <td>{product.stock_quantity}</td>
                                <td>⭐ {product.rating}</td>
                                <td>{product.extra}</td>
                                <td>
                                    {product.featured ? (
                                        <span className="badge featured">Yes</span>
                                    ) : (
                                        <span className="badge not-featured">No</span>
                                    )}
                                </td>
                                <td>
                                    <FaEdit
                                        className="action-icon edit-icon"
                                        onClick={() => handleEditProduct(product.id)}
                                    />
                                    <FaTrash
                                        className="action-icon delete-icon"
                                        onClick={() => handleDeleteProduct(product.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            ) : (
                <p className="no-products-message">No products found.</p>
            )}
        </div>
    </div>
    );
};

export default AdminPanel;
