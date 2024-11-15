import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],       
        favorites: [],       

        productDetails: null,
        isLoading: false,
        error: null,
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
        },

        setProductDetails: (state, action) => {
            state.productDetails = action.payload;
            state.isLoading = false;
            state.error = null;
        },

        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    }
});

export const { setProducts, toggleFavorite, setProductDetails, setLoading, setError } = productsSlice.actions;

export default productsSlice.reducer;
