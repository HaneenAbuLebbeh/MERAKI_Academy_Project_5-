const pool = require("../models/db");

// Create a new product (Just For ADMIN)
const createProduct = async (req, res) => {
    const { 
        name, description, price, 
        category_id, spot_id, image, 
        rating, extra 
    } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price, category_id, spot_id, image, rating, extra) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', 
            [name, description, price, category_id, spot_id, image, rating, extra]
        );

        res.status(201).json({
            success: true,
            message: 'Product created',
            product: result.rows[0],
        });
    } 
    
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message,
        });
    }
};





module.exports = {
    createProduct,
    
    
};
