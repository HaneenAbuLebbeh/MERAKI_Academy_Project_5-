import { configureStore } from "@reduxjs/toolkit"; 
import loginReducer from "../Redux/reducers/login"
import productReducer from "../Redux/reducers/products"

const store=configureStore({

    reducer:{
        login:loginReducer ,
        products :productReducer
    }


})

export default store