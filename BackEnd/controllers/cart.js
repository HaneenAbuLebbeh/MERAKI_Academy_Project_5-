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



    const getUserCart = async (req, res) => {  
        const userId = req.token.userId;

    //JOIN cart_items & products => product_id --- id
    //JOIN carts & cart_items  => id --- cart_id 
        try {
            const result = await pool.query(`
                SELECT 
                    carts.id, 
                    cart_items.id, 
                    cart_items.product_id, 
                    cart_items.quantity, 
                    cart_items.price, 
                    products.name
                FROM 
                    carts
                LEFT JOIN 
                    cart_items ON carts.id = cart_items.cart_id
                LEFT JOIN 
                    products ON cart_items.product_id = products.id
                WHERE 
                    carts.user_id = $1
            `, [userId]);
    
            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Cart not found for this user"
                });
            }
    
            const cart = {
                cart_id: result.rows[0].id,
                items: result.rows.map(row => ({
                    item_id: row.id,
                    product_id: row.product_id,
                    product_name: row.name,
                    quantity: row.quantity,
                    price: row.price
                }))
            };
    
            res.status(200).json({ success: true, cart });
    
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: err.message });
        }
    };
    


    const updateCartQuantity = async (req, res) => {
        const { product, quantity } = req.body;
        const userId = req.token.userId;
    
        // Check if the quantity is at least 1
        if (quantity < 1) {
            return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
        }
    
        try {
            // Find the user's cart
            const cartResult = await pool.query(`
                SELECT id 
                FROM carts 
                WHERE user_id = $1
            `, [userId]);
    
            if (cartResult.rows.length === 0) {
                return res.status(404).json({ success: false, message: 'Cart not found' });
            }
    
            const cartId = cartResult.rows[0].id;
    
            // Check if the product exists in the cart
            const itemResult = await pool.query(`
                SELECT id 
                FROM cart_items 
                WHERE cart_id = $1 AND product_id = $2
            `, [cartId, product]);
    
            if (itemResult.rows.length === 0) {
                return res.status(404).json({ success: false, message: 'Product not found in cart' });
            }
    
            const itemId = itemResult.rows[0].id;
    
            // Update the quantity of product in the cart
            await pool.query(`
                UPDATE cart_items
                SET quantity = $1
                WHERE id = $2
            `, [quantity, itemId]);
    
            // get the updated cart with product details
            const updatedCartResult = await pool.query(`
                SELECT 
                    cart_items.id AS item_id, 
                    cart_items.product_id, 
                    cart_items.quantity, 
                    cart_items.price, 
                    products.name AS product_name
                FROM cart_items
                LEFT JOIN products ON cart_items.product_id = products.id
                WHERE cart_items.cart_id = $1
            `, [cartId]);
    
            const cart = {
                cart_id: cartId,
                items: updatedCartResult.rows.map(row => ({
                    item_id: row.item_id,
                    product_id: row.product_id,
                    product_name: row.product_name,
                    quantity: row.quantity,
                    price: row.price
                }))
            };
            res.status(200).json({ success: true, cart });
        } 
        catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: err.message });
        }
    };


module.exports = {
    addToCart,
    getUserCart,
    updateCartQuantity,


};