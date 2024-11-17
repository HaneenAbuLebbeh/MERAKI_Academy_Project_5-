import { configureStore } from "@reduxjs/toolkit"; 
import loginReducer from "../Redux/reducers/login"
import productReducer from "../Redux/reducers/products"
import cartReducer from "../Redux/reducers/cart"

const store=configureStore({

    reducer:{
        login:loginReducer ,
        products :productReducer,
        cart : cartReducer
    }


})

export default store