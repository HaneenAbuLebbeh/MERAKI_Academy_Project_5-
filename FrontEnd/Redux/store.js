import { configureStore } from "@reduxjs/toolkit"; 
import loginReducer from "../Redux/reducers/login"

const store=configureStore({

    reducer:{
        login:loginReducer 

    }


})

export default store