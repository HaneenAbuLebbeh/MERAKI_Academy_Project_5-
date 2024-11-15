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
        }
    }
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
