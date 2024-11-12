const express=require("express")

const {
    register,
    login,
    googleLogin
}=require("../controllers/users")

const userRouter=express.Router()

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post('/google-login', googleLogin);

module.exports = userRouter  