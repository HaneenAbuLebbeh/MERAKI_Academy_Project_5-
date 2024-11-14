import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],       
        favorites: [],       
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload; // Set products from APi-response
        },

        toggleFavorite: (state, action) => {
            const productId = action.payload;

            // If the product is in favorites, remove it
            if (state.favorites.includes(productId)) {
                state.favorites = state.favorites.filter(id => id !== productId);
            } 
            else {
                // If it's not, add it
                state.favorites.push(productId);
            }
        }
    }
});

export const { setProducts, toggleFavorite } = productsSlice.actions;

export default productsSlice.reducer;
