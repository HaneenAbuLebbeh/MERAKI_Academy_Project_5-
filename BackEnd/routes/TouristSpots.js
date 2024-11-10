const express=require("express") 

const {createTouristSpot,gitAlltouristSpostsById,deleteTouristSpot,updateToursitspots}= require("../controllers/TouristSpots")

const touristRouter= express.Router()

touristRouter.post("/",createTouristSpot)
touristRouter.get("/:id",gitAlltouristSpostsById)
touristRouter.delete("/:spot",deleteTouristSpot)
touristRouter.put("/:spot",updateToursitspots)

module.exports=touristRouter 

 