import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
       items: [],  // Items added to the cart
        total: 0,   // Total-price of items in the cart
    },
    
    reducers: {
        /****Add product to the cart****/
        addToCart: (state, action) => {
            const { productId, productName, productPrice, quantity } = action.payload;
            const existingProduct = state.items.find(item => item.productId === productId);
            
            // If product exists => update quantity
            if (existingProduct) {
            existingProduct.quantity += quantity;
            }
            // If product doesn't exist => add it to cart
            else {
            state.items.push({ productId, productName, productPrice, quantity });
            }
        }, 

        /****set the cart updateCart****/
        updateCart: (state, action) => {
            state.items = action.payload ; // Update items in cart
            const items = action.payload || [];//
            state.items = items;//

            state.total = state.items.reduce(
                (acc, item) => acc + item.productPrice * item.quantity,
                0
            );
            if (items.length === 0) {
                state.items = [];
                state.total = 0;
            }
        },

        
        /****Update the quantity of a specific product****/
        updateQuantity: (state, action) => {
            const { productId, newQuantity } = action.payload;
            const product = state.items.find(item => item.productId === productId);
            
            if (product) {
                product.quantity = newQuantity;
            } 
            
            // Update the total-price
           /* state.total = state.items.reduce(
                (acc, item) => acc + item.productPrice * item.quantity,0);*/
        },

        /***Remove a specific product from the cart***/
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(item => item.productId !== productId);
            
            // Update the total-price
            state.total = state.items.reduce(
                (acc, item) => acc + item.productPrice * item.quantity,0);
        },

        /***Clear the entire cart***/
            clearCart: (state) => {
                state.items = [];
                state.total = 0;
                },
    }
});

export const { addToCart,updateCart,updateQuantity,removeFromCart,clearCart } = cartSlice.actions;

export default cartSlice.reducer;





/**
 * // If the newquantity is zero, remove from cart
 * else if (product && newQuantity === 0) {
                state.items = state.items.filter(item => item.productId !== productId);
            }
 */