import { createSlice } from "@reduxjs/toolkit"
export const login=createSlice({
name: "login" , 
initialState: {
token:  localStorage.getItem('token')|| null ,
userId: localStorage.getItem('userId') || null ,
isLoggedIn : false ,
},
reducers :{
setLogin: (state,action)=>{
state.token=action.payload 
state.isLoggedIn=true
localStorage.setItem('token',action.payload )
}, 
setUserId :(state,action)=>{
    state.userId=action.payload
    localStorage.setItem('userId',action.payload )
}, 
setLogout :(state)=>{
    state.token=null
    state.userId=null
    state.isLoggedIn=false
    localStorage.clear()
}

}}) 

export const {setLogin,setUserId,setLogout}=login.actions
export default login.reducer 