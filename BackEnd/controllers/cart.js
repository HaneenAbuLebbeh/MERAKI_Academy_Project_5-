const pool = require("../models/db");


const addToCart = async (req, res) => {
    const { product, quantity } = req.body;
    const userId = req.token.userId; 

    try {
        // 1. Check if the user has a cart
        let cart = await pool.query(
            'SELECT * FROM carts WHERE user_id = $1',
            [userId]
        );

        // If the cart does not exist, create it first
        if (cart.rows.length === 0) {
            const newCart = await pool.query(
                'INSERT INTO carts (user_id) VALUES ($1) RETURNING id',
                [userId]
            );
            cart = newCart.rows[0]; // The new cart
        } 
         // If the cart exist,
        else {
            cart = cart.rows[0]; // The existing cart
        }

        // 2. Get product details from the products table
        const productDetails = await pool.query(
            'SELECT * FROM products WHERE id = $1',
            [product]
        );

        if (productDetails.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const price = productDetails.rows[0].price; // Get the price from product details

        // 3. Check if the product already exists in the cart
        const itemIndex = await pool.query(
            'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2',
            [cart.id, product]
        );

        if (itemIndex.rows.length > 0) {
            // If the item exists, update its quantity
            const updatedItem = await pool.query(
                'UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *',
                [quantity, cart.id, product]
            );
            return res.status(200).json({
                success: true,
                message: 'Item quantity updated',
                item: updatedItem.rows[0]
            });
        } 
        
        else {
            // If the item does not exist, add it
            const newItem = await pool.query(
                'INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
                [cart.id, product, quantity, price]
            );
            return res.status(200).json({
                success: true,
                message: 'Item added to cart',
                item: newItem.rows[0]
            });
        }
    } 
    
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};



module.exports = {
    addToCart,
};