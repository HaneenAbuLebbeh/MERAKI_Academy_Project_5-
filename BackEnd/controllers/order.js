const pool = require("../models/db");

const createOrder = async (req, res) => { 
    const userId = req.token.userId;
    const { shippingAddress, paymentMethod, note } = req.body;

    try {
        // Get the user's cart details
        const cartResult = await pool.query(`
            SELECT cart_items.product_id, cart_items.quantity, cart_items.price, products.name 
            FROM cart_items
            LEFT JOIN products ON cart_items.product_id = products.id
            LEFT JOIN carts ON cart_items.cart_id = carts.id
            WHERE carts.user_id = $1
        `, [userId]);

        if (cartResult.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        // Calculate total amount
        const totalAmount = cartResult.rows.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

        // Create a new order
        const orderResult = await pool.query(`
            INSERT INTO orders 
            (user_id, total_amount, payment_method, is_paid, is_delivered, note, full_address, street, city, state, country, latitude, longitude) 
            VALUES 
            ($1, $2, $3, FALSE, FALSE, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id
        `, [
            userId, 
            totalAmount, 
            paymentMethod, 
            note, 
            shippingAddress.full_address, 
            shippingAddress.street, 
            shippingAddress.city, 
            shippingAddress.state, 
            shippingAddress.country, 
            shippingAddress.latitude, 
            shippingAddress.longitude
        ]);

        const orderId = orderResult.rows[0].id;

        // Add order items 
        await Promise.all(cartResult.rows.map(item => {
            return pool.query(`
                INSERT INTO order_items 
                (order_id, product_id, quantity, price) 
                VALUES ($1, $2, $3, $4)
            `, [orderId, item.product_id, item.quantity, item.price]);
        }));

        // Delete the user cart after completing the order
        await pool.query(`
            DELETE FROM cart_items 
            USING carts 
            WHERE cart_items.cart_id = carts.id 
            AND carts.user_id = $1
        `, [userId]);

        res.status(201).json({ success: true, orderId });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const getUserOrders = async (req, res) => {
    const userId = req.token.userId;

    try {
        // get all orders for the user
        const ordersResult = await pool.query(`
            SELECT * 
            FROM orders 
            WHERE user_id = $1
        `, [userId]);

        if (ordersResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found for this user' });
        }

        const orderIds = ordersResult.rows.map(order => order.id);

        // get all order items that belong to the user orders + with product names
        const orderItemsResult = await pool.query(`
            SELECT * 
            FROM order_items 
            JOIN products ON order_items.product_id = products.id 
            WHERE order_id = ANY($1::int[])
        `, [orderIds]);

        // link each order with its items
        const orders = ordersResult.rows.map(order => {
            return {
                ...order,
                items: orderItemsResult.rows.filter(item => item.order_id === order.id)
            };
        });

        return res.status(200).json({ success: true, orders });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



const getOrderById = async (req, res) => {
    const orderId = req.params.id;
    const userId = req.token.userId;

    try {
        // get order details based on orderID & userID 
        const orderResult = await pool.query(`
            SELECT * 
            FROM orders 
            WHERE id = $1 AND user_id = $2
        `, [orderId, userId]);

        if (orderResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        const order = orderResult.rows[0];

        // get order items
        const orderItemsResult = await pool.query(`
            SELECT * 
            FROM order_items 
            WHERE order_id = $1
        `, [orderId]);

        // Add order items to the order details
        order.items = orderItemsResult.rows;

        res.status(200).json({ success: true, order });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const getAllOrders = async (req, res) => {
    try {
        // get all orders
        const ordersResult = await pool.query(`
            SELECT * 
            FROM orders
        `);

        const orders = ordersResult.rows;

        // get order items for each order
        for (const order of orders) {
            const orderItemsResult = await pool.query(`
                SELECT * 
                FROM order_items 
                WHERE order_id = $1
            `, [order.id]);

            // Add order items to the order details
            order.items = orderItemsResult.rows;
        }

        res.status(200).json({ success: true, orders });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = { 
    createOrder,
    getUserOrders,
    getOrderById,
    getAllOrders
}


/* 
const orderItemsResult = await pool.query(`
            SELECT order_items.*, products.name AS product_name
            FROM order_items
            JOIN products ON order_items.product_id = products.id
            JOIN orders ON order_items.order_id = orders.id
            WHERE orders.user_id = $1
        `, [userId]); 
        
*/