const express=require("express")

const {
    register,
    login,
    googleLogin,
    getUserbyId,updateUserInfo,getAllUsers
}=require("../controllers/users")

const userRouter=express.Router()

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post('/google-login', googleLogin);
userRouter.get("/userinfo/:id",getUserbyId)
userRouter.put("/update/:id",updateUserInfo)
userRouter.get("/usersInfo",getAllUsers)
module.exports = userRouter  