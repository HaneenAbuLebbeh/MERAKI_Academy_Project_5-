const express=require("express") 

const {createReview,deleteReview}=require("../controllers/review")

const reviewRouter=express.Router()

reviewRouter.post("/",createReview)
reviewRouter.delete("/:id",deleteReview) 


module.exports=reviewRouter 