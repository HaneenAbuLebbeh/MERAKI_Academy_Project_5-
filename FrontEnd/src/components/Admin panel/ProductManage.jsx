import React, { useEffect, useState } from 'react'; 
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading } from "../../../Redux/reducers/products";
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { DotLoader } from "react-spinners";
import Sidebar from './Sidebar';
import './Admin.css';

const ProductManage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products);
    const isLoading = useSelector((state) => state.products.isLoading);

    const [searchQuery, setSearchQuery] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        stock_quantity: "",
        image: "",
    });

    useEffect(() => {
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
                dispatch(setLoading(false));
            });
    }, [dispatch]);

    const handleEditProduct = (productId) => {
        navigate(`/admin/edit-product/${productId}`);
    };

    const handleDeleteProduct = (productId) => {
        console.log(`Delete product with ID: ${productId}`);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddProduct = () => {
        console.log("New Product:", newProduct);
        setIsPopupOpen(false); // Close the popup after saving
    };

    return (
    <div className='all-the-table'>
        <div className="admin-container">
            <Sidebar />
            <div className="admin-content">
                {/* Title and Controls */}
                <div className="header-controls">
                    <h1 className="manage-title">Manage Products</h1>
                    <div className="admin-controls">
                        <button
                            className="add-product-button"
                            onClick={() => setIsPopupOpen(true)} // Open the popup
                        >
                            + Add New Product
                        </button>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Loader and Table */}
                {isLoading ? (
                    <div className="loading-indicator">
                        <DotLoader color="#3498db" size={50} />
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <table className="order-table">
                        <thead className="table-header">
                            <tr>
                                <th>Product ID</th>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Stock Quantity</th>
                                <th>Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="table-row">
                                    <td>{product.id}</td>
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
                                    <td>{product.category_name}</td>
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

{/* Popup window to add new product */}
{isPopupOpen && (
    <div className="popup-overlay">
        <div className="popup-content">
            <h2>Add New Product</h2>
            <form>
                <label>
                    Product Name:
                    <input
                        className='inputofpopup'
                        type="text"
                        value={newProduct.name}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, name: e.target.value })
                        }
                    />
                </label>
                <label>
                    Price:
                    <input
                        className='inputofpopup'
                        type="number"
                        value={newProduct.price}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, price: e.target.value })
                        }
                    />
                </label>
                <label>
                    Stock Quantity:
                    <input
                        className='inputofpopup'
                        type="number"
                        value={newProduct.stock_quantity}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, stock_quantity: e.target.value })
                        }
                    />
                </label>
                {/* File upload for image */}
                <label>
                    Product Image:
                    <input
                        className='inputofpopup'
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, image: URL.createObjectURL(e.target.files[0]) })
                        }
                    />
                </label>
            </form>
            <div className="popup-actions">
                <button className="save-button" onClick={handleAddProduct}>
                    Save
                </button>
                <button className="cancel-button" onClick={() => setIsPopupOpen(false)}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
)}

        </div>
</div>
    );
};

export default ProductManage;
