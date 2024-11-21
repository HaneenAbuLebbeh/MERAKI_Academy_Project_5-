const express = require("express");
const {addToFavourite,getFavourtieById}=require("../controllers/favourite")

const favouriteRouter=express.Router()

favouriteRouter.post("/add",addToFavourite)
favouriteRouter.get("/:id",getFavourtieById)

module.exports = favouriteRouter; 

