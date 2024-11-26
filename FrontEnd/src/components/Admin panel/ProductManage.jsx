import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, toggleFavorite, setLoading } from "../../../Redux/reducers/products";
import axios from 'axios';
import { FaHeart, FaEdit, FaTrash } from 'react-icons/fa';
import { DotLoader } from "react-spinners";
import Sidebar from './Sidebar';
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

                </table>
            ) : (
                <p className="no-products-message">No products found.</p>
            )}
        </div>
    </div>
    );
};

export default AdminPanel;
